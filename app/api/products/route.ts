import { NextResponse } from 'next/server';
import { getEnabledProducts } from '@/lib/database-neon';

// Fallback products for when database isn't available (e.g., Vercel Edge)
const fallbackProducts = [
  {
    id: 'core',
    name: 'LactoClear® Core',
    price: 49.99,
    description: 'Break down lactate accumulation and dismantle the protective barrier',
    image: '/products/core-bottle.png',
    color: '#00D036',
    badge: null,
    enabled: 1,
    features: ['Lactate breakdown', 'Barrier dismantling', 'Foundation protocol'],
  },
  {
    id: 'mitofuel',
    name: 'MitoFuel®',
    price: 54.99,
    description: 'Reactivate mitochondrial function and accelerate metabolic recovery',
    image: '/products/mitofuel-bottle.png',
    color: '#FF7A00',
    badge: null,
    enabled: 1,
    features: ['Mitochondrial activation', 'Metabolic acceleration', 'Recovery support'],
  },
  {
    id: 'complete',
    name: 'LactoClear® Complete System',
    price: 89.99,
    description: 'The complete two-step protocol: Core + MitoFuel for optimal results',
    image: '/products/bottles.png',
    color: '#00A3E8',
    badge: 'BEST VALUE',
    enabled: 1,
    features: ['Complete protocol', 'Core + MitoFuel', 'Save $15'],
  },
  {
    id: 'nasal-core',
    name: 'LactoClear® Nasal Core',
    price: 39.99,
    description: 'Fast-acting nasal spray delivery for rapid lactate clearance',
    image: '/products/nasal-spray-core.png',
    color: '#00D036',
    badge: null,
    enabled: 1,
    features: ['Nasal delivery', 'Fast-acting', 'Convenient application'],
  },
  {
    id: 'nasal-mitofuel',
    name: 'MitoFuel® Nasal Spray',
    price: 44.99,
    description: 'Targeted nasal delivery for enhanced mitochondrial support',
    image: '/products/nasal-spray-mitofuel.png',
    color: '#FF7A00',
    badge: null,
    enabled: 1,
    features: ['Nasal delivery', 'Mitochondrial support', 'Quick absorption'],
  },
];

export async function GET() {
  try {
    let products;
    
    try {
      products = await getEnabledProducts();
      
      // Parse features JSON for each product
      const productsWithFeatures = products.map((product: any) => ({
        ...product,
        features: product.features ? JSON.parse(product.features) : []
      }));
      
      // If we got products from DB, use them
      if (productsWithFeatures.length > 0) {
        return NextResponse.json(productsWithFeatures);
      }
    } catch (dbError) {
      console.log('Database not available, using fallback products');
    }
    
    // Use fallback products
    return NextResponse.json(fallbackProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return fallback products even on error
    return NextResponse.json(fallbackProducts);
  }
}
