import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, event_data, page_url } = body;

    if (!event_type) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      undefined;

    trackEvent({
      event_type,
      event_data: event_data ? JSON.stringify(event_data) : undefined,
      page_url,
      user_agent: userAgent,
      ip_address: ipAddress,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
