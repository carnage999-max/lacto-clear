import { NextResponse } from 'next/server';
import { getEnabledFAQs } from '@/lib/database';

export async function GET() {
  try {
    const faqs = getEnabledFAQs();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
