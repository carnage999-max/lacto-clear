# ☁️ Vercel vs AWS Amplify Comparison

Quick reference for your migration from Vercel to AWS Amplify.

---

## 🏗️ Current Setup (Vercel)

**What Works:**
- ✅ Frontend deployment (Next.js)
- ✅ Fallback products/FAQs (hardcoded)
- ✅ Stripe checkout
- ✅ Public pages (buy, faq, testimonials)
- ✅ OG images & SEO

**What Doesn't Work:**
- ❌ Database persistence (SQLite limitation)
- ❌ Admin panel (needs database)
- ❌ Order tracking
- ❌ Analytics persistence
- ❌ Content management

**Why:** Vercel's serverless environment doesn't support SQLite file persistence.

---

## 🚀 Target Setup (AWS Amplify)

**What Will Work:**
- ✅ Everything from Vercel
- ✅ **Real database** (PostgreSQL RDS/Aurora)
- ✅ **Admin panel fully functional**
- ✅ **Orders persist** and track
- ✅ **Analytics** saved to database
- ✅ **Content management** works
- ✅ **Webhooks** save to database

**Key Difference:** Real database = full functionality!

---

## 📊 Feature Comparison

| Feature | Vercel (Current) | Amplify (Target) |
|---------|------------------|------------------|
| **Deployment** | ✅ Auto (Git push) | ✅ Auto (Git push) |
| **Build Time** | ~2-3 min | ~2-3 min |
| **Custom Domain** | ✅ Free SSL | ✅ Free SSL |
| **Edge Network** | ✅ Global CDN | ✅ CloudFront CDN |
| **Database** | ❌ SQLite (ephemeral) | ✅ RDS/Aurora |
| **Admin Panel** | ❌ No persistence | ✅ Fully functional |
| **Orders** | ⚠️ Lost on deploy | ✅ Persistent |
| **Analytics** | ⚠️ Lost on deploy | ✅ Persistent |
| **File Storage** | ❌ Temporary | ✅ S3 integration |
| **Scaling** | ✅ Automatic | ✅ Automatic |
| **Monitoring** | ✅ Vercel Analytics | ✅ CloudWatch |
| **Cost (free tier)** | $0 | $0 (12 months) |
| **Cost (paid)** | $20/month | ~$20-30/month |

---

## 💰 Cost Breakdown

### Vercel
```
Free Tier:
- 100 GB bandwidth
- Unlimited sites
- Automatic HTTPS

Pro Plan ($20/month):
- 1 TB bandwidth
- Advanced analytics
- Team collaboration
```

### AWS Amplify
```
Free Tier (12 months):
- 1,000 build minutes/month
- 15 GB served/month
- 5 GB storage

After Free Tier:
- Amplify: ~$0.01 per build min, $0.15 per GB
- RDS db.t3.micro: ~$15/month
- Aurora Serverless: ~$0.12/hour active
- S3 Storage: $0.023 per GB

Total: ~$20-30/month
```

---

## 🔄 Migration Steps

### 1. Database Setup (Most Important!)

**Option A: AWS RDS (Simple)**
```bash
Cost: ~$15/month
Setup time: 15 minutes
Best for: Predictable traffic
```

**Option B: Aurora Serverless (Smart)**
```bash
Cost: Pay per use (~$8-20/month)
Setup time: 20 minutes
Best for: Variable traffic
```

**Option C: Neon.tech (Free Start)**
```bash
Cost: FREE (0.5GB limit)
Setup time: 5 minutes
Best for: Testing/MVP
```

### 2. Update Database Code

Replace SQLite with PostgreSQL:
- Install: `npm install pg`
- Run: `scripts/postgres-schema.sql`
- Update: `lib/database.ts` to use `pg` Pool

### 3. Deploy to Amplify

1. Connect GitHub repo
2. Add environment variables
3. Deploy!

**Time:** ~30 minutes total

---

## 🎯 Recommended Migration Path

### Phase 1: Testing (Week 1)
```
1. Keep Vercel running (current)
2. Set up Neon.tech free PostgreSQL
3. Deploy to Amplify (preview)
4. Test thoroughly
5. Compare both environments
```

### Phase 2: Migration (Week 2)
```
1. Update DNS to point to Amplify
2. Configure Stripe webhooks
3. Test all features
4. Monitor for issues
5. Keep Vercel as backup
```

### Phase 3: Optimization (Week 3+)
```
1. Upgrade to RDS if needed
2. Optimize database queries
3. Set up CloudWatch alerts
4. Configure backups
5. Turn off Vercel
```

---

## ⚡ Quick Start (When Ready)

### Prerequisites
```bash
# 1. Create PostgreSQL database (choose one):
- Neon.tech (free, 5 min setup)
- AWS RDS (paid, 15 min setup)
- AWS Aurora (paid, 20 min setup)

# 2. Run schema migration:
psql <DATABASE_URL> -f scripts/postgres-schema.sql

# 3. Verify products/FAQs inserted:
psql <DATABASE_URL> -c "SELECT COUNT(*) FROM products;"
```

### Deploy to Amplify
```bash
1. Go to AWS Amplify Console
2. New App → Host Web App → GitHub
3. Select: carnage999-max/lacto-clear
4. Branch: main
5. amplify.yml auto-detected ✅
6. Add environment variables
7. Save and Deploy
```

### Environment Variables
```bash
DATABASE_URL=postgres://...
NEXT_PUBLIC_SITE_URL=https://...amplifyapp.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_PASSWORD=<secure>
SESSION_SECRET=<random-32-chars>
```

### Test Checklist
```
□ Homepage loads
□ Products show (5 items)
□ FAQs show (10 items)
□ Cart works
□ Checkout works
□ Admin login works
□ Orders save to DB
□ Analytics track
```

---

## 🆘 Troubleshooting

### Vercel Issues (Current)
- **No products?** → Fallback should show 5 products
- **No FAQs?** → Fallback should show 10 FAQs
- **Orders not saving?** → Expected (SQLite limitation)
- **Admin not working?** → Expected (no database)

### Amplify Issues (Future)
- **Build fails?** → Check amplify.yml and env vars
- **Database connection?** → Verify DATABASE_URL
- **No products/FAQs?** → Run postgres-schema.sql
- **Webhooks fail?** → Update STRIPE_WEBHOOK_SECRET

---

## 📈 Benefits of Migration

### Immediate Benefits
1. ✅ Full admin panel functionality
2. ✅ Orders persist and track
3. ✅ Analytics save permanently
4. ✅ Content management works
5. ✅ Real customer data storage

### Long-term Benefits
1. ✅ AWS ecosystem integration
2. ✅ Better database options
3. ✅ S3 for file storage
4. ✅ Lambda for custom functions
5. ✅ CloudWatch for monitoring
6. ✅ Scales to millions of users

---

## 🎓 Learning Resources

- **AWS Amplify Docs:** https://docs.amplify.aws/
- **RDS Setup:** https://docs.aws.amazon.com/rds/
- **Aurora Serverless:** https://aws.amazon.com/rds/aurora/serverless/
- **PostgreSQL Migration:** https://www.postgresql.org/docs/

---

## ✅ Summary

**Current State (Vercel):**
- Works great for frontend
- Limited by SQLite
- Admin/orders don't persist

**Future State (Amplify):**
- Full-featured application
- Real database
- Everything works!

**Migration Effort:**
- Database setup: 15-20 min
- Code updates: Minimal (already prepared!)
- Deployment: 10 min
- Total: ~1 hour

**Your repository is now ready for both platforms!** 🎉

Continue using Vercel for testing, switch to Amplify when you need full functionality.
