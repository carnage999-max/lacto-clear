# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account
- Stripe account (for payments)
- This repository pushed to GitHub/GitLab/Bitbucket

---

## 1. Initial Deployment

### Push to Git
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your repository
4. Vercel will auto-detect Next.js settings

---

## 2. Environment Variables

### Required Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Site URL (replace with your actual domain)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Stripe (get from stripe.com/dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Admin Authentication (create secure passwords)
ADMIN_PASSWORD=your-very-secure-password
SESSION_SECRET=generate-random-32-char-string

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### How to Get Stripe Keys
1. Go to [stripe.com/dashboard/apikeys](https://dashboard.stripe.com/apikeys)
2. Copy "Publishable key" → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy "Secret key" → `STRIPE_SECRET_KEY`

### How to Get Stripe Webhook Secret
1. Go to [stripe.com/dashboard/webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Events to send: Select "checkout.session.completed"
5. Copy the "Signing secret" → `STRIPE_WEBHOOK_SECRET`

### Generate Secure SESSION_SECRET
```bash
# On Mac/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 3. Database Setup

### Vercel Postgres (Recommended for Production)

Since SQLite doesn't work well on serverless:

1. **Option A: Vercel Postgres**
   - Go to your project in Vercel
   - Storage → Create Database → Postgres
   - Follow their setup guide
   - You'll need to update `lib/database.ts` to use Postgres instead

2. **Option B: Railway/PlanetScale**
   - Use [Railway](https://railway.app) or [PlanetScale](https://planetscale.com)
   - Get connection string
   - Update database connection in `lib/database.ts`

3. **Option C: Keep SQLite (Development Only)**
   - Current setup will work for testing
   - NOT recommended for production
   - Data will reset on each deployment

### Run Database Initialization
The `postinstall` script in `package.json` automatically runs `init-db-vercel.js` which:
- Creates all tables
- Populates 5 default products
- Populates 10 default FAQs

---

## 4. Custom Domain (Optional)

### Add Custom Domain
1. Go to Vercel Dashboard → Your Project
2. Settings → Domains
3. Add your domain (e.g., lactoclear.com)
4. Follow DNS configuration instructions

### Update Environment Variable
After adding domain, update:
```bash
NEXT_PUBLIC_SITE_URL=https://lactoclear.com
```

---

## 5. Verification Checklist

After deployment, verify:

- [ ] Homepage loads (`/`)
- [ ] Products page shows 5 products (`/buy`)
- [ ] FAQ page shows 10 FAQs (`/faq`)
- [ ] Cart system works
- [ ] Checkout redirects to Stripe
- [ ] Admin login works (`/admin/login`)
- [ ] Admin dashboard shows data (`/admin/dashboard`)
- [ ] OG images work (test with [opengraph.xyz](https://www.opengraph.xyz/))
- [ ] Stripe webhook receives events

---

## 6. Post-Deployment Setup

### Add Initial Products
1. Login to admin: `https://your-domain.com/admin/login`
2. Go to Products → Add Product
3. Upload product images
4. Set prices and descriptions

### Configure Stripe Webhooks
Test webhook:
```bash
stripe listen --forward-to https://your-domain.com/api/webhooks/stripe
```

### Monitor Analytics
- Check `/admin/dashboard` for real-time data
- Monitor orders in `/admin/orders`
- Track user events

---

## 7. Troubleshooting

### No FAQs Showing
- Check Vercel logs: `vercel logs your-project-name`
- Verify `init-db-vercel.js` ran during build
- Check database connection

### Stripe Payments Fail
- Verify all 3 Stripe env vars are set
- Test with Stripe test cards: `4242 4242 4242 4242`
- Check webhook endpoint is accessible

### Admin Login Not Working
- Verify `ADMIN_PASSWORD` env var is set
- Check `SESSION_SECRET` is set (32+ characters)
- Clear browser cookies and try again

### Database Errors
- SQLite won't persist on Vercel (serverless limitation)
- Consider upgrading to Vercel Postgres or Railway
- Check build logs for database initialization errors

---

## 8. Performance Optimization

### Already Configured
- ✅ Next.js Image optimization
- ✅ Edge runtime for OG images
- ✅ Font optimization (Montserrat, Inter)
- ✅ Automatic code splitting

### Additional Optimizations
1. Enable Vercel Analytics (free tier)
2. Set up monitoring/alerts
3. Configure caching headers
4. Add CDN for static assets

---

## 9. Security Best Practices

### Before Going Live
- [ ] Change ADMIN_PASSWORD from default
- [ ] Use strong SESSION_SECRET (32+ chars)
- [ ] Use Stripe LIVE keys (not test keys)
- [ ] Enable HTTPS only (Vercel does this automatically)
- [ ] Review CORS settings if needed
- [ ] Set up rate limiting for API routes

### Monitoring
- Enable Vercel Security Monitoring
- Set up Stripe Radar for fraud detection
- Review admin access logs regularly

---

## 10. Backup Strategy

### Database Backups
If using Vercel Postgres:
- Automatic backups included
- Export manually: Vercel Dashboard → Storage → Export

If using Railway/PlanetScale:
- Follow their backup documentation

### Code Backups
- Keep Git repository updated
- Tag releases: `git tag v1.0.0`
- Document all environment variables securely

---

## Support

For deployment issues:
1. Check Vercel logs
2. Review this guide
3. Check Vercel documentation
4. Review error messages in browser console

---

## Quick Deploy Command

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from command line
vercel --prod

# Set environment variables
vercel env add ADMIN_PASSWORD
vercel env add SESSION_SECRET
# ... add all other env vars
```

---

## Success! 🎉

Your LactoClear® website should now be live!

**Next Steps:**
1. Test all pages thoroughly
2. Add real product images
3. Update admin password
4. Set up Stripe webhook
5. Monitor first orders
6. Share with customers!
