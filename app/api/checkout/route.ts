import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createOrder, createOrderItems } from '@/lib/database-neon';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Convert cart items to Stripe line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `LactoClear® ${item.name}`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Calculate total
    const amountTotal = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity * 100), 0
    );

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/buy?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

    // Save order to database
    try {
      const orderId = await createOrder({
        stripe_session_id: session.id,
        amount_total: amountTotal,
        currency: 'usd',
        status: 'pending',
      });

      // Save order items
      const orderItems = items.map((item: any) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: Math.round(item.price * 100),
      }));

      await createOrderItems(orderId?.id || orderId, orderItems);

      console.log(`Order ${orderId} created for session ${session.id}`);
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database fails - payment is more important
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
