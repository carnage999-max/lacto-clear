import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lactoclear-admin-2025';
const SESSION_COOKIE = 'admin_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'lactoclear-session-secret-key-change-in-production';

// Simple session token generation
function generateSessionToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
}

// Verify admin credentials
export function verifyAdminCredentials(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

// Create admin session
export async function createAdminSession() {
  const token = generateSessionToken();
  const cookieStore = await cookies();
  
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  
  return token;
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);
    return !!session?.value;
  } catch (error) {
    return false;
  }
}

// Clear admin session
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

// Middleware to protect admin routes
export async function requireAuth(request: NextRequest) {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    // Redirect to login page
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return null; // Continue to the route
}
