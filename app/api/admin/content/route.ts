import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { 
  getAllFAQs, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getSetting,
  setSetting
} from '@/lib/database';

// FAQs
export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    if (type === 'faqs') {
      const faqs = getAllFAQs();
      return NextResponse.json(faqs);
    } else if (type === 'testimonials') {
      const testimonials = getAllTestimonials();
      return NextResponse.json(testimonials);
    } else if (type === 'settings') {
      const heroTitle = getSetting('hero_title') || 'CLEARING THE PATH FOR PEAK RECOVERY';
      const heroSubtext = getSetting('hero_subtext') || 'Break through the lactate barrier. Restore metabolic balance. Unlock your body\'s natural recovery potential with the LactoClear® system.';
      
      return NextResponse.json({ heroTitle, heroSubtext });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { type } = body;

    if (type === 'faq') {
      const { category, question, answer, color, sort_order, enabled } = body;
      
      if (!category || !question || !answer) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      createFAQ({
        category,
        question,
        answer,
        color: color || null,
        sort_order: sort_order || 0,
        enabled: enabled ? 1 : 0,
      });

      return NextResponse.json({ success: true });
    } else if (type === 'testimonial') {
      const { name, location, rating, text, highlight, color, enabled, sort_order } = body;
      
      if (!name || !text) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      createTestimonial({
        name,
        location: location || null,
        rating: rating || 5,
        text,
        highlight: highlight || null,
        color: color || null,
        enabled: enabled ? 1 : 0,
        sort_order: sort_order || 0,
      });

      return NextResponse.json({ success: true });
    } else if (type === 'settings') {
      const { heroTitle, heroSubtext } = body;
      
      if (heroTitle) setSetting('hero_title', heroTitle);
      if (heroSubtext) setSetting('hero_subtext', heroSubtext);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { type, id, ...updates } = body;

    if (type === 'faq') {
      if (!id) {
        return NextResponse.json(
          { error: 'FAQ ID is required' },
          { status: 400 }
        );
      }

      const updateData: any = {};
      if (updates.category !== undefined) updateData.category = updates.category;
      if (updates.question !== undefined) updateData.question = updates.question;
      if (updates.answer !== undefined) updateData.answer = updates.answer;
      if (updates.color !== undefined) updateData.color = updates.color;
      if (updates.sort_order !== undefined) updateData.sort_order = updates.sort_order;
      if (updates.enabled !== undefined) updateData.enabled = updates.enabled ? 1 : 0;

      updateFAQ(id, updateData);
      return NextResponse.json({ success: true });
    } else if (type === 'testimonial') {
      if (!id) {
        return NextResponse.json(
          { error: 'Testimonial ID is required' },
          { status: 400 }
        );
      }

      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.location !== undefined) updateData.location = updates.location;
      if (updates.rating !== undefined) updateData.rating = updates.rating;
      if (updates.text !== undefined) updateData.text = updates.text;
      if (updates.highlight !== undefined) updateData.highlight = updates.highlight;
      if (updates.color !== undefined) updateData.color = updates.color;
      if (updates.enabled !== undefined) updateData.enabled = updates.enabled ? 1 : 0;
      if (updates.sort_order !== undefined) updateData.sort_order = updates.sort_order;

      updateTestimonial(id, updateData);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    if (type === 'faq') {
      deleteFAQ(parseInt(id));
      return NextResponse.json({ success: true });
    } else if (type === 'testimonial') {
      deleteTestimonial(parseInt(id));
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
