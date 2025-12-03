import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus, createShippingAddress, getOrderBySessionId } from '@/lib/database-neon';

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

        // Get the order to update status
        const order = await getOrderBySessionId(session.id);
        if (order) {
          // Update order status
          await updateOrderStatus(order.id, 'paid');

          // Save shipping address if available
          const shippingAddress = (session as any).shipping_details?.address;
          if (shippingAddress) {
            await createShippingAddress({
              order_id: order.id,
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
        const order = await getOrderBySessionId(session.id);
        if (order) {
          await updateOrderStatus(order.id, 'paid');
        }
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const order = await getOrderBySessionId(session.id);
        if (order) {
          await updateOrderStatus(order.id, 'failed');
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const order = await getOrderBySessionId(session.id);
        if (order) {
          await updateOrderStatus(order.id, 'expired');
        }
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
