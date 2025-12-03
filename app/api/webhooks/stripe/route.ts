import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus, createShippingAddress, getOrderBySessionId } from '@/lib/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log('Payment successful for session:', session.id);

        // Update order status
        updateOrderStatus(
          session.id,
          'paid',
          session.payment_intent as string
        );

        // Get the order to add customer details
        const order = getOrderBySessionId(session.id);
        if (order) {
          // Update customer info if available
          if (session.customer_details?.email) {
            const db = require('@/lib/database').default;
            const stmt = db.prepare(`
              UPDATE orders 
              SET customer_email = ?, customer_name = ?, updated_at = CURRENT_TIMESTAMP
              WHERE stripe_session_id = ?
            `);
            stmt.run(
              session.customer_details.email,
              session.customer_details.name || null,
              session.id
            );
          }

          // Save shipping address if available
          const shippingAddress = (session as any).shipping_address;
          if (shippingAddress) {
            createShippingAddress({
              order_id: order.id!,
              name: (session as any).shipping_details?.name || null,
              address_line1: shippingAddress.line1 || null,
              address_line2: shippingAddress.line2 || null,
              city: shippingAddress.city || null,
              state: shippingAddress.state || null,
              postal_code: shippingAddress.postal_code || null,
              country: shippingAddress.country || null,
            });
          }
        }

        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        updateOrderStatus(session.id, 'paid', session.payment_intent as string);
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        updateOrderStatus(session.id, 'failed');
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        updateOrderStatus(session.id, 'expired');
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
