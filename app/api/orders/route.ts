import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllOrders, 
  getOrderItems, 
  getShippingAddress,
  getOrderStats 
} from '@/lib/database';

// Get all orders with details
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const orders = getAllOrders(limit, offset);
    const stats = getOrderStats();

    // Enrich orders with items and shipping
    const enrichedOrders = orders.map(order => {
      const items = getOrderItems(order.id!);
      const shipping = getShippingAddress(order.id!);
      
      return {
        ...order,
        items,
        shipping,
        amount_display: `$${(order.amount_total / 100).toFixed(2)}`,
      };
    });

    return NextResponse.json({
      orders: enrichedOrders,
      stats: {
        totalOrders: stats.totalOrders,
        totalRevenue: `$${(stats.totalRevenue / 100).toFixed(2)}`,
        recentOrders: stats.recentOrders,
      },
      pagination: {
        limit,
        offset,
        hasMore: orders.length === limit,
      },
    });
  } catch (error: any) {
    console.error('Orders API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
