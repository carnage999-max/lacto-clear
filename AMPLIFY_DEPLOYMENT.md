# 🚀 AWS Amplify Deployment Guide

Complete guide for deploying LactoClear® to AWS Amplify.

---

## 📋 Prerequisites

- AWS Account
- GitHub repository
- Stripe account
- RDS PostgreSQL or Aurora Serverless database (recommended)

---

## 🗄️ Database Setup (CRITICAL - Do This First!)

### Option 1: Amazon RDS PostgreSQL (Recommended)

1. **Create RDS Instance:**
   ```
   - Go to AWS RDS Console
   - Create Database → PostgreSQL
   - Choose template: Free tier or Production
   - DB instance: db.t3.micro (free tier) or larger
   - Master username: lactoclear
   - Master password: <create-secure-password>
   - Public access: No (use VPC)
   - Database name: lactoclear
   ```

2. **Get Connection String:**
   ```
   postgres://lactoclear:password@your-rds-endpoint.rds.amazonaws.com:5432/lactoclear
   ```

3. **Security Group:**
   - Allow inbound PostgreSQL (5432) from Amplify IP ranges
   - Or use VPC connection

### Option 2: Amazon Aurora Serverless v2

1. **Create Aurora Cluster:**
   ```
   - Engine: Aurora PostgreSQL
   - Capacity: Serverless v2
   - Min ACUs: 0.5
   - Max ACUs: 1
   - Database name: lactoclear
   ```

2. **Benefits:**
   - Scales to zero when not in use
   - Pay only for what you use
   - Better for variable traffic

### Option 3: Neon.tech (External, Free Tier)

If you want to avoid AWS database costs initially:

1. Go to [neon.tech](https://neon.tech)
2. Create free PostgreSQL database
3. Copy connection string
4. Use in Amplify environment variables

---

## 🔧 Database Migration

You'll need to migrate from SQLite to PostgreSQL. Here's how:

### 1. Install Postgres Adapter

```bash
npm install pg
```

### 2. Update `lib/database.ts`

Create a new file `lib/database-postgres.ts`:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Add your database functions here using pool.query()
// instead of better-sqlite3 methods
```

### 3. Run Schema Migration

Create migration script `scripts/migrate-to-postgres.sql`:

```sql
-- Copy the schema from lib/database.ts CREATE TABLE statements
-- Run this in your PostgreSQL database
```

---

## 🚀 Amplify Setup

### Step 1: Connect Repository

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Choose "GitHub" and authorize
4. Select repository: `carnage999-max/lacto-clear`
5. Select branch: `main`

### Step 2: Build Settings

Amplify will auto-detect the `amplify.yml` file. Review and confirm:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
```

### Step 3: Environment Variables

Add these in Amplify Console → App Settings → Environment Variables:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-amplify-domain.amplifyapp.com

# Database (CRITICAL!)
DATABASE_URL=postgres://user:pass@host:5432/dbname

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Admin Authentication
ADMIN_PASSWORD=your-secure-password-here
SESSION_SECRET=generate-random-32-char-string

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Generate SESSION_SECRET:**
```bash
openssl rand -base64 32
```

### Step 4: Advanced Settings

1. **Node Version:**
   - Add environment variable: `_LIVE_PACKAGE_UPDATES=[]`
   - Node version is auto-detected from package.json

2. **Build Image:**
   - Use latest: Amazon Linux 2023

3. **Redirects & Rewrites:**
   - Already handled by Next.js

---

## 🔐 Configure Stripe Webhooks

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter URL:
   ```
   https://your-domain.amplifyapp.com/api/webhooks/stripe
   ```
4. Select events:
   - ✅ `checkout.session.completed`
5. Copy "Signing secret" → Update `STRIPE_WEBHOOK_SECRET` in Amplify

---

## 🌐 Custom Domain Setup

### Option 1: Use Amplify Default Domain
```
https://main.d1234abcdef.amplifyapp.com
```

### Option 2: Add Custom Domain

1. **In Amplify Console:**
   - App Settings → Domain management
   - Add domain: `lactoclear.com`

2. **DNS Configuration:**
   - Add CNAME records provided by Amplify
   - SSL certificate auto-generated
   - Wait 15-30 minutes for DNS propagation

3. **Update Environment Variables:**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://lactoclear.com
   ```

---

## 🧪 Testing Deployment

After deployment completes:

### 1. Verify Public Pages
- [ ] Homepage loads: `/`
- [ ] Products show: `/buy` (5 products)
- [ ] FAQs show: `/faq` (10 FAQs)
- [ ] All pages accessible

### 2. Test E-commerce
- [ ] Add product to cart
- [ ] Checkout redirects to Stripe
- [ ] Complete test payment (card: 4242 4242 4242 4242)
- [ ] Webhook receives event
- [ ] Order saved to database

### 3. Test Admin Panel
- [ ] Login works: `/admin/login`
- [ ] Dashboard shows data: `/admin/dashboard`
- [ ] Products manageable: `/admin/products`
- [ ] Orders visible: `/admin/orders`

### 4. Test SEO/Social
- [ ] Meta tags present (view source)
- [ ] OG image generates: `/opengraph-image`
- [ ] Test sharing: [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`

---

## 📊 Monitoring & Logs

### View Build Logs
1. Amplify Console → Your App
2. Click on latest deployment
3. View build logs for errors

### View Application Logs
1. Amplify Console → Monitoring
2. Access logs show requests
3. CloudWatch for detailed logs

### Set Up Alerts
1. CloudWatch → Alarms
2. Monitor:
   - 4xx/5xx errors
   - Response time
   - Build failures

---

## 💰 Cost Estimate

### Amplify Hosting
- **Build minutes:** First 1,000 free/month
- **Hosting:** First 15 GB served free/month
- **After free tier:** ~$0.15 per GB

### Database (RDS PostgreSQL)
- **db.t3.micro:** ~$15/month (free tier 750 hrs/month)
- **Aurora Serverless v2:** ~$0.12/hour when active

### Total Estimated Cost
- **First year (free tier):** $0-5/month
- **After free tier:** $20-30/month

---

## 🔄 Continuous Deployment

Amplify automatically deploys when you push to `main`:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Amplify will:
1. Detect push
2. Run build
3. Deploy automatically
4. Update production

**Branch Deployments:**
Create preview environments:
```bash
git checkout -b feature-branch
git push origin feature-branch
```

Enable in Amplify Console → App Settings → Branch settings

---

## 🐛 Troubleshooting

### Build Fails

**Check:**
1. Build logs in Amplify Console
2. Ensure all env vars are set
3. Node version compatibility
4. Dependencies install correctly

**Common fixes:**
```bash
# Clear npm cache
- npm ci --legacy-peer-deps

# Increase build memory
_LIVE_PACKAGE_UPDATES=[]
```

### Database Connection Issues

**Check:**
1. DATABASE_URL is correct
2. RDS security group allows Amplify
3. Database is publicly accessible OR use VPC
4. SSL mode is configured

**Test connection:**
```bash
# SSH into Amplify build environment
psql $DATABASE_URL
```

### Webhook Not Working

**Check:**
1. Webhook URL is correct
2. STRIPE_WEBHOOK_SECRET matches Stripe dashboard
3. Endpoint is publicly accessible
4. Check Amplify logs for incoming requests

---

## 🔒 Security Best Practices

### Before Going Live

- [ ] Use LIVE Stripe keys (not test)
- [ ] Strong ADMIN_PASSWORD (16+ characters)
- [ ] Random SESSION_SECRET (32+ characters)
- [ ] HTTPS only (Amplify default)
- [ ] Database not publicly accessible
- [ ] Regular RDS snapshots enabled
- [ ] CloudWatch alarms configured

### Amplify Security Features

- **HTTPS:** Automatic SSL/TLS
- **DDoS:** AWS Shield Standard (free)
- **WAF:** Optional Web Application Firewall
- **Auth:** Built-in authentication options

---

## 📈 Scaling & Performance

### Amplify Auto-Scaling
- Automatically handles traffic spikes
- No configuration needed
- CDN caching for static assets

### Database Scaling

**RDS:**
- Upgrade instance type
- Enable Read Replicas
- Use connection pooling

**Aurora Serverless:**
- Auto-scales ACUs (compute)
- Scales to zero when idle
- Perfect for variable traffic

---

## 🔄 Rollback Strategy

If deployment fails:

1. **Amplify Console:**
   - Deployments → Previous version
   - Click "Redeploy this version"

2. **Git Revert:**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Database Rollback:**
   - Use RDS snapshots
   - Test in staging first

---

## 📞 Support Resources

- **AWS Amplify Docs:** https://docs.amplify.aws/
- **Next.js on Amplify:** https://docs.amplify.aws/guides/hosting/nextjs
- **RDS Setup:** https://docs.aws.amazon.com/rds/
- **Stripe Webhooks:** https://stripe.com/docs/webhooks

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] All pages load correctly
- [ ] Products and FAQs visible
- [ ] Stripe checkout works
- [ ] Orders save to database
- [ ] Webhooks receive events
- [ ] Admin panel accessible
- [ ] Analytics tracking works
- [ ] Email notifications work
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] CloudWatch monitoring enabled
- [ ] Backup strategy implemented
- [ ] Error tracking configured
- [ ] Performance optimized

---

## 🎉 You're Live!

Your LactoClear® website is now running on AWS Amplify with:
- ✅ Global CDN distribution
- ✅ Automatic scaling
- ✅ 99.95% uptime SLA
- ✅ Managed database
- ✅ Continuous deployment
- ✅ Enterprise security

**Next Steps:**
1. Monitor initial traffic
2. Set up analytics
3. Configure backups
4. Plan scaling strategy
5. Optimize performance

Welcome to AWS! 🚀
