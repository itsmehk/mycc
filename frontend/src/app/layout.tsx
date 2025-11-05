import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CardMatch Pro - Smart Credit Card Recommendations',
  description:
    'Get personalized credit card recommendations based on your spending habits, income, and financial goals. AI-powered matching with real community insights.',
  keywords: [
    'credit card',
    'credit card recommendations',
    'best credit cards India',
    'credit card comparison',
    'credit card rewards',
    'cashback cards',
    'travel cards',
  ],
  authors: [{ name: 'CardMatch Pro' }],
  openGraph: {
    title: 'CardMatch Pro - Smart Credit Card Recommendations',
    description: 'Find your perfect credit card match in 3 minutes. AI-powered recommendations.',
    type: 'website',
    url: 'https://cardmatch-pro.vercel.app',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'CardMatch Pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CardMatch Pro - Smart Credit Card Recommendations',
    description: 'Find your perfect credit card match in 3 minutes. AI-powered recommendations.',
    images: ['https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        {/* Google Analytics (optional) */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
