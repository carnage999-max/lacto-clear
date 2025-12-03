import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus, getOrderBySessionId } from '@/lib/database';

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
      const order = getOrderBySessionId(sessionId);
      
      if (order && order.status !== 'paid') {
        updateOrderStatus(
          sessionId,
          'paid',
          session.payment_intent as string
        );

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
            sessionId
          );
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
