import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getOrderStats } from '@/lib/database-neon';

export async function GET() {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const stats = await getOrderStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
