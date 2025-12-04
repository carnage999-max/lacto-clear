# Homepage Redirect Issue - Troubleshooting Guide

## Problem
When visiting `https://lacto-clear.vercel.app/` directly, the page redirects to `/faq` instead of showing the homepage.

This issue occurs on the Vercel deployment but NOT on localhost.

## Root Cause Investigation
Possible causes:
1. Vercel project settings redirect
2. Browser cache/cookies
3. Vercel Edge caching
4. Deployment configuration

## Solution Implemented

### 1. Updated next.config.ts
- Added explicit redirects array (empty) to prevent unintended redirects
- Added Cache-Control headers for the homepage to ensure proper caching
- Set homepage to `s-maxage=60` with stale-while-revalidate

### 2. Updated app/page.tsx
- Added `export const dynamic = 'force-static'` to ensure homepage is always statically generated
- This prevents any dynamic routing or middleware interference

### 3. Cleanup
- Removed empty test-route directory that might interfere

## If Issue Persists

### Check Vercel Dashboard
1. Go to your Vercel project settings
2. Check **Settings > Git > Auto Git Sync** - make sure it's enabled
3. Check **Deployments** - redeploy the latest main branch
4. Check if there are any **redirects** in project settings

### Manual Vercel Steps
1. In Vercel Dashboard, go to your lacto-clear project
2. Go to **Deployments** tab
3. Find the latest deployment and click "Redeploy"
4. Optionally clear cache in Vercel Dashboard (Project Settings > Data > Clear Cache)

### Verify Local Behavior
Run locally to ensure homepage works:
```bash
npm run build
npm start
# Visit http://localhost:3000
# Should see homepage, not FAQ
```

### Browser Cache
If issue persists even after redeploy:
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache for lacto-clear.vercel.app
3. Try in incognito/private window

### Final Check
Check if any URL parameters are affecting routing:
- Ensure URL is exactly `https://lacto-clear.vercel.app/`
- Not `https://lacto-clear.vercel.app/?page=faq` or similar

## Monitoring
After fix:
- Test the homepage URL in different browsers
- Test on mobile devices
- Test the FAQ page separately to ensure it still works
- Test all other pages to ensure they're not affected

## Technical Details
The homepage now has these protections:
- Static generation forced: `force-static`
- Cache headers: `public, s-maxage=60, stale-while-revalidate=120`
- No redirects configured in next.config
- Clean middleware with no side effects

If the issue continues, it's likely a Vercel account-level setting or deployment configuration that needs to be verified manually in the Vercel dashboard.
