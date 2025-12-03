import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllOrders, 
  getOrderItems, 
  getShippingAddress,
  getOrderStats 
} from '@/lib/database-neon';

// Get all orders with details
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const orders = await getAllOrders(limit, offset);
    const stats = await getOrderStats();

    // Enrich orders with items and shipping
    const enrichedOrders = await Promise.all(orders.map(async (order: any) => {
      const items = await getOrderItems(order.id);
      const shipping = await getShippingAddress(order.id);
      
      return {
        ...order,
        items,
        shipping,
        amount_display: `$${(order.amount_total / 100).toFixed(2)}`,
      };
    }));

    // Calculate stats from orders
    const totalOrders = stats.length;
    const totalRevenue = stats.reduce((sum: number, stat: any) => sum + (stat.total_revenue || 0), 0);

    return NextResponse.json({
      orders: enrichedOrders,
      stats: {
        totalOrders,
        totalRevenue: `$${(totalRevenue / 100).toFixed(2)}`,
        recentOrders: enrichedOrders.slice(0, 5),
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
