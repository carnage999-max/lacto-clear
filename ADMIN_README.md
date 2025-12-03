# LactoClear® Admin System

## 🎉 What's New

Your LactoClear® website now has a complete admin management system with:

- ✅ **Authentication** - Password-protected admin access
- ✅ **Analytics Dashboard** - Real-time revenue, orders, and user tracking
- ✅ **Product Management** - Edit prices, descriptions, availability (coming next)
- ✅ **Content Management** - Manage FAQs, testimonials (coming next)
- ✅ **Event Tracking** - Automatic tracking of page views, clicks, add-to-cart

---

## 🔐 Admin Access

### Login Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Default Password**: `lactoclear-admin-2025`

⚠️ **IMPORTANT**: Change the password in production!

### Change Admin Password
1. Open `.env.local` (or create from `.env.local.example`)
2. Set your own password:
```bash
ADMIN_PASSWORD=your-secure-password-here
SESSION_SECRET=your-random-secret-key-here
```

---

## 📊 Admin Features

### 1. Dashboard (`/admin/dashboard`)
View real-time analytics:
- **Total Revenue** - All-time earnings from paid orders
- **Total Orders** - Number of completed orders
- **Recent Orders** - Orders from last 7 days
- **Product Performance** - Revenue and units sold per product
- **User Events** - Page views, clicks, add-to-cart events

### 2. Orders (`/admin/orders`)
Existing order management system:
- View all customer orders
- See order details, items, shipping info
- Track order status
- Filter and search orders

### 3. Products (`/admin/products`) - Coming Next
- Edit product names, descriptions
- Update prices
- Enable/disable products
- Change product images
- Reorder products

### 4. Content (`/admin/content`) - Coming Next
- Manage FAQ questions and answers
- Add/edit/delete testimonials
- Update homepage hero text
- Edit site settings

---

## 📈 Analytics Tracking

### Automatic Tracking
The system automatically tracks:
- ✅ **Page Views** - Every page visit (except admin pages)
- ✅ **Add to Cart** - When users add products
- ✅ **Checkout Initiated** - When users start checkout

### View Analytics
1. Go to `/admin/dashboard`
2. See "User Events" section
3. View counts for each event type

### Custom Event Tracking
Track custom events in your code:
```typescript
import { trackEvent } from '@/components/AnalyticsTracker';

// Track button click
trackEvent('button_click', { button_name: 'View Product' });

// Track any custom event
trackEvent('custom_event', { custom_data: 'value' });
```

---

## 🗄️ Database Schema

### New Tables Added

1. **products** - Product management
   - Store product details, prices, images
   - Enable/disable products
   - Control product order

2. **faqs** - FAQ management
   - Add/edit/delete FAQ items
   - Category color coding
   - Sort order control

3. **testimonials** - Testimonial management
   - Customer testimonials
   - Rating system
   - Enable/disable reviews

4. **site_settings** - Site configuration
   - Key-value settings store
   - Homepage content
   - General site settings

5. **analytics_events** - Event tracking
   - All user interactions
   - Page views, clicks
   - Timestamps and metadata

---

## 🚀 Getting Started

### 1. Set Up Environment
```bash
# Copy example env file if not already done
cp .env.local.example .env.local

# Edit .env.local and set:
# - ADMIN_PASSWORD (change from default!)
# - SESSION_SECRET (random string)
# - Your Stripe keys
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Admin Panel
1. Visit `http://localhost:3000/admin/login`
2. Enter password: `lactoclear-admin-2025`
3. You'll be redirected to admin home

### 4. View Dashboard
- Click "Dashboard" to see analytics
- View revenue, orders, product performance
- Check user event tracking

---

## 🔒 Security Notes

### Production Deployment
Before deploying to production:

1. **Change Admin Password**
   ```bash
   ADMIN_PASSWORD=your-very-secure-password
   ```

2. **Set Strong Session Secret**
   ```bash
   SESSION_SECRET=$(openssl rand -base64 32)
   ```

3. **Enable HTTPS**
   - Sessions use `secure` flag in production
   - Requires HTTPS to work properly

4. **Protect Admin Routes**
   - All `/admin/*` routes (except login) require authentication
   - Sessions last 7 days
   - Logout clears session immediately

---

## 📝 Next Steps

### Phase 2 (To Be Built)
1. **Product Management UI**
   - CRUD interface for products
   - Image upload
   - Bulk editing

2. **Content Management UI**
   - FAQ editor
   - Testimonial management
   - Homepage content editor

3. **Advanced Analytics**
   - Date range filtering
   - Conversion funnels
   - Export to CSV

### Database Already Ready!
All database tables and functions are already created. Just need to build the UI pages.

---

## 🛠️ API Endpoints

### Public APIs
- `POST /api/analytics/track` - Track events (no auth required)

### Admin APIs (Auth Required)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/check-auth` - Check if authenticated
- `GET /api/admin/stats` - Get order statistics
- `GET /api/admin/analytics` - Get event analytics
- `GET /api/admin/product-analytics` - Get product performance

---

## 💡 Tips

1. **Test Analytics**
   - Browse your site normally
   - Add products to cart
   - View `/admin/dashboard` to see tracked events

2. **Monitor Performance**
   - Check product analytics to see what sells
   - Track which pages get most views
   - Monitor conversion rates

3. **Stay Secure**
   - Never commit `.env.local` to git
   - Change default password immediately
   - Use strong session secrets

---

## 📞 Support

For issues or questions:
1. Check this README first
2. Review code comments in admin files
3. Check browser console for errors

Happy managing! 🎉
