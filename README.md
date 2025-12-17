# Hovey Painting - Professional Painting Services Website

![Hovey Painting](public/og-image.png)

A modern, professional landing page for Hovey Painting, a family-owned and operated painting business with over 35 years of experience in Colorado.

## 🎨 Features

- **Responsive Design** - Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Built with Next.js 15, React 19, and Tailwind CSS
- **Contact Form** - Functional contact form with email integration using Nodemailer
- **Portfolio Showcase** - Beautiful image galleries showcasing residential, commercial, and restoration projects
- **SEO Optimized** - Includes structured data, meta tags, and Open Graph tags for better search engine visibility
- **Performance Tracking** - Integrated with Vercel Analytics and Speed Insights
- **Mobile Menu** - Smooth slide-in mobile navigation with hamburger menu
- **Interactive Features** - Click-to-call buttons, copy-to-clipboard email, and smooth scrolling navigation

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) & [Speed Insights](https://vercel.com/docs/speed-insights)
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm, yarn, or pnpm

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hoveypainting.git
cd hoveypainting
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Create a \`.env.local\` file in the root directory and add your email server credentials:
```env
EMAIL_SERVER_HOST=your-smtp-host
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📧 Email Configuration

The contact form uses Nodemailer to send emails. You'll need to configure your SMTP server settings:

### Using Gmail (Example)

1. Enable 2-Factor Authentication in your Google account
2. Generate an App Password at [Google Account Security](https://myaccount.google.com/security)
3. Use these settings in your \`.env.local\`:
```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-gmail@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
```

### Using Other SMTP Providers

You can use any SMTP provider (SendGrid, Mailgun, AWS SES, etc.). Just update the environment variables accordingly.

## 🎯 Project Structure

```
hoveypainting/
├── app/
│   ├── actions.ts          # Server actions for form submission
│   ├── globals.css         # Global styles and Tailwind config
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main landing page
├── components/
│   └── ui/                 # shadcn/ui components
├── public/
│   ├── *.jpg, *.png        # Portfolio images
│   └── favicon.ico
├── lib/
│   └── utils.ts            # Utility functions
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json
```

## 🎨 Customization

### Colors

The primary accent color (red/rose) is defined in \`tailwind.config.ts\` and \`app/globals.css\`. You can change it by modifying the \`primary\` color values.

### Images

Replace the images in the \`public/\` directory with your own project photos. The following images are used:
- Portfolio images (residential interior, exterior, commercial, restoration)
- Before/after transformation photos
- Favicon and Open Graph images

### Content

Update the content in \`app/page.tsx\` to match your business information:
- Business hours
- Contact information
- Service descriptions
- Testimonials
- Company history

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

The easiest way to deploy is to click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hoveypainting)

### Environment Variables on Vercel

Don't forget to add these environment variables in your Vercel project settings:
- \`EMAIL_SERVER_HOST\`
- \`EMAIL_SERVER_PORT\`
- \`EMAIL_SERVER_USER\`
- \`EMAIL_SERVER_PASSWORD\`

## 📱 Features Breakdown

### Header & Navigation
- Sticky header with smooth scrolling
- Responsive mobile menu with slide-in animation
- Click-to-scroll navigation links

### Hero Section
- Eye-catching headline and call-to-action buttons
- Fully centered and responsive layout

### About Section
- Dramatic before/after photo showcase
- Company values and highlights
- Trust-building content

### Services Section
- 6 core service offerings
- Icon-based service cards
- Clear service descriptions

### Portfolio Section
- Categorized project galleries
- Residential interior, exterior, commercial, and restoration projects
- Optimized lazy-loaded images

### Testimonials Section
- 4 customer testimonials
- 5-star ratings
- Social proof to build trust

### Contact Section
- Functional contact form
- Business hours
- Click-to-call phone number
- Copy-to-clipboard email
- Social media links

## 🔧 Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm run lint\` - Run ESLint

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/hoveypainting/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

**Hovey Painting**
- Website: [hoveypainting.com](https://hoveypainting.com)
- Phone: (720) 351-0209
- Email: hoveypainting@yahoo.com
- Facebook: [@HoveyPainting](https://www.facebook.com/HoveyPainting)

---

Built with ❤️ by Hovey Painting | Family-owned and operated for over 35 years
