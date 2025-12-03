'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    if (pathname && !pathname.startsWith('/admin')) {
      trackEvent('page_view', { page: pathname });
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}

// Helper function to track events
export function trackEvent(eventType: string, eventData?: Record<string, any>) {
  // Don't track in admin pages or development
  if (typeof window === 'undefined') return;
  if (window.location.pathname.startsWith('/admin')) return;

  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_type: eventType,
      event_data: eventData,
      page_url: window.location.pathname,
    }),
  }).catch((error) => {
    console.error('Analytics tracking error:', error);
  });
}
