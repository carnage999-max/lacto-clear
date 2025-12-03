import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getProductAnalytics } from '@/lib/database-neon';

export async function GET() {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const analytics = await getProductAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching product analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
