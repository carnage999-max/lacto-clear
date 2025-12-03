import { NextResponse } from 'next/server';
import { getEnabledProducts } from '@/lib/database';

export async function GET() {
  try {
    const products = getEnabledProducts();
    
    // Parse features JSON for each product
    const productsWithFeatures = products.map(product => ({
      ...product,
      features: product.features ? JSON.parse(product.features) : []
    }));
    
    return NextResponse.json(productsWithFeatures);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
