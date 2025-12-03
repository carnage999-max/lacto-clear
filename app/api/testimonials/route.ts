import { NextResponse } from 'next/server';
import { getEnabledTestimonials } from '@/lib/database';

export async function GET() {
  try {
    let testimonials;
    
    try {
      testimonials = getEnabledTestimonials();
      
      // If we got testimonials from DB, use them
      if (testimonials.length > 0) {
        return NextResponse.json(testimonials);
      }
    } catch (dbError) {
      console.log('Database not available, using empty testimonials');
    }
    
    // Return empty array for testimonials (you removed fake ones)
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json([]);
  }
}
