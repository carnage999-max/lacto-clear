import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus, getOrderBySessionId } from '@/lib/database-neon';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe to verify payment
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Check if payment was successful
    if (session.payment_status === 'paid') {
      // Update order status in database
      const order = await getOrderBySessionId(sessionId);
      
      if (order && order.status !== 'paid') {
        await updateOrderStatus(
          order.id,
          'paid'
        );

        // Update customer info if available
        if (session.customer_details?.email) {
          await updateOrderStatus(order.id, 'paid');
        }

        console.log(`Order updated to paid for session ${sessionId}`);
      }

      return NextResponse.json({ 
        success: true, 
        status: 'paid',
        order: order 
      });
    }

    return NextResponse.json({ 
      success: false, 
      status: session.payment_status 
    });

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
