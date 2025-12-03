import { NextResponse } from 'next/server';
import { getEnabledTestimonials } from '@/lib/database';

export async function GET() {
  try {
    const testimonials = getEnabledTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
