# LactoClear® - Setup Instructions

## Stripe Integration Setup

### 1. Get Your Stripe API Keys

1. Go to [https://stripe.com](https://stripe.com) and sign up or log in
2. Navigate to **Developers** > **API keys**
3. Copy your **Publishable key** and **Secret key**

### 2. Set Up Environment Variables

1. Create a `.env.local` file in the root directory (if it doesn't exist)
2. Add your Stripe keys:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**For production:**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/buy` page
3. Click "Add to Cart" on any product
4. Click the floating cart button (bottom right)
5. Click "Proceed to Checkout"
6. You'll be redirected to Stripe's secure checkout page

### 4. Test Card Numbers (for development)

Use these test card numbers in Stripe test mode:

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **3D Secure:** 4000 0025 0000 3155

- **Expiry:** Any future date (e.g., 12/34)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any 5 digits (e.g., 12345)

## Cart Features

### Floating Cart Button
- Always visible on all pages (bottom right corner)
- Shows item count badge
- Click to open cart drawer

### Cart Drawer
- Slide-in panel from right
- View all cart items
- Adjust quantities (+/-)
- Remove items
- See total price
- Proceed to Stripe checkout

### Cart Persistence
- Cart saved to localStorage
- Persists across page refreshes
- Clears after successful purchase

## File Structure

```
app/
├── api/
│   └── checkout/
│       └── route.ts          # Stripe checkout session API
├── success/
│   └── page.tsx              # Order confirmation page
└── layout.tsx                # Includes CartProvider

components/
├── CartDrawer.tsx            # Cart sidebar
└── FloatingCartButton.tsx    # Floating cart button

context/
└── CartContext.tsx           # Cart state management
```

## Customization

### Product Configuration
Edit products in `/app/buy/page.tsx`:

```typescript
const products = [
  {
    id: 'core',
    name: 'LactoClear® Core',
    price: 49.99,  // Update prices here
    // ...
  },
  // ...
];
```

### Shipping Countries
Edit allowed countries in `/app/api/checkout/route.ts`:

```typescript
shipping_address_collection: {
  allowed_countries: ['US', 'CA'], // Add more countries
},
```

### Currency
Change currency in `/app/api/checkout/route.ts`:

```typescript
price_data: {
  currency: 'usd', // Change to 'eur', 'gbp', etc.
  // ...
},
```

## Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use test keys in development** - Keys starting with `sk_test_` and `pk_test_`
3. **Use live keys only in production** - Keys starting with `sk_live_` and `pk_live_`
4. **Keep secret keys secure** - Never expose in client-side code

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in project settings
4. Deploy

### Environment Variables in Vercel
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Troubleshooting

### "No items in cart" error
- Make sure environment variables are set correctly
- Check that `STRIPE_SECRET_KEY` is set

### Checkout not redirecting
- Verify `NEXT_PUBLIC_SITE_URL` is correct
- Check browser console for errors
- Ensure Stripe keys are valid

### Cart not persisting
- Check browser localStorage settings
- Ensure JavaScript is enabled
- Clear cache and reload

## Next Steps

1. ✅ Add `.env.local` with your Stripe keys
2. ✅ Test with Stripe test cards
3. ✅ Customize product prices if needed
4. ✅ Add product images (see IMAGE_REQUIREMENTS.txt)
5. ✅ Configure webhook for production (optional)
6. ✅ Enable production mode with live keys

## Support

For Stripe documentation: [https://stripe.com/docs](https://stripe.com/docs)

For Next.js documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
