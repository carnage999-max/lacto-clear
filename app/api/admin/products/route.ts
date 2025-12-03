import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, Product } from '@/lib/database-neon';

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
    const id = searchParams.get('id');

    if (id) {
      const product = await getProductById(id);
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }

    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
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
    const { id, name, price, description, features, image, color, badge, enabled, sort_order } = body;

    if (!id || !name || price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: id, name, price' },
        { status: 400 }
      );
    }

    await createProduct({
      id,
      name,
      price: parseFloat(price),
      description: description || undefined,
      features: features ? JSON.stringify(features) : undefined,
      image: image || undefined,
      color: color || undefined,
      badge: badge || undefined,
      enabled: enabled ? 1 : 0,
      sort_order: sort_order || 0,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating product:', error);
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const updateData: any = {};
    
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.price !== undefined) updateData.price = parseFloat(updates.price);
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.features !== undefined) updateData.features = JSON.stringify(updates.features);
    if (updates.image !== undefined) updateData.image = updates.image;
    if (updates.color !== undefined) updateData.color = updates.color;
    if (updates.badge !== undefined) updateData.badge = updates.badge;
    if (updates.enabled !== undefined) updateData.enabled = updates.enabled ? 1 : 0;
    if (updates.sort_order !== undefined) updateData.sort_order = updates.sort_order;

    await updateProduct(id, updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
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
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
