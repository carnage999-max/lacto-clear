import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getUniquePageViews } from '@/lib/database-neon';

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
    const startDate = searchParams.get('start_date') || undefined;
    const endDate = searchParams.get('end_date') || undefined;

    const pageViews = await getUniquePageViews(startDate, endDate);
    return NextResponse.json(pageViews);
  } catch (error) {
    console.error('Error fetching page views:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
