# LactoClear® Website

A modern Next.js website for LactoClear®, featuring a kinetic, medical-grade design with premium branding.

## 🎨 Design System

### Color Palette
- **Black** (#000000) - Primary background
- **Electric Blue** (#00A3E8) - Energy, motion, highlights
- **Emerald Green** (#00D036) - Core product branding
- **Flame Orange** (#FF7A00) - MitoFuel product branding
- **Bright Yellow** (#FFD400) - Accent highlights
- **Silver/Graphite** (#9FA4A6) - Borders and separators
- **White** (#FFFFFF) - Primary text

### Typography
- **Headings**: Montserrat (Bold & Semi-bold)
- **Body**: Inter (Regular)

## 📁 Project Structure

```
app/
├── page.tsx                 # Home page with hero and product overview
├── how-it-works/           # Explains the lactate shield concept
├── the-system/             # Core + MitoFuel product details
├── science/                # Educational content about lactate
├── faq/                    # Frequently asked questions with search
├── testimonials/           # Customer reviews and experiences
├── nasal-spray/            # Nasal spray product line
├── contact/                # Contact form and information
├── buy/                    # Product purchase page
├── layout.tsx              # Root layout with navigation and footer
└── globals.css             # Global styles and color system

components/
├── Navigation.tsx          # Main navigation with mobile menu
└── Footer.tsx              # Site footer with links and social
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`

## 🛠️ Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icon library

## ✨ Features

### Pages Implemented
- ✅ Home page with hero section and product overview
- ✅ How It Works - 3-step process explanation
- ✅ The System - Core and MitoFuel product pages
- ✅ Science - Educational content
- ✅ FAQ - Searchable accordion
- ✅ Testimonials - Customer reviews grid
- ✅ Nasal Spray - Nasal delivery products
- ✅ Contact - Contact form
- ✅ Buy - Product purchase page

### Design Features
- ✅ Responsive navigation with mobile menu
- ✅ Smooth scroll animations
- ✅ Hover effects with electric blue glow
- ✅ High contrast black background design
- ✅ Icon-based UI (no emojis)
- ✅ Mobile-responsive layouts
- ✅ Kinetic visual effects

## 🎯 Key Design Principles

1. **High Contrast** - All text uses white on black for maximum readability
2. **Kinetic Motion** - Subtle animations that feel fast and clean
3. **Medical Grade** - Professional, premium feel throughout
4. **No Emojis** - Using Lucide React icons for all visual elements
5. **Color Coding** - Green for Core, Orange for MitoFuel, Blue for accents

## 📝 Notes

- Product images are currently represented with icon placeholders
- Shopping cart functionality needs backend integration
- Contact form needs email service integration
- All content follows FDA compliance guidelines (no disease treatment claims)

## 🔄 Next Steps

1. Add actual product images
2. Integrate e-commerce platform (Shopify/Stripe)
3. Connect contact form to email service
4. Add CMS for content management
5. Implement shopping cart functionality
6. Add analytics tracking
7. Set up SEO optimization
8. Add blog/resources section

## 📄 License

Private - All rights reserved by LactoClear®
