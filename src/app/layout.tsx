import type { Metadata } from 'next';
import { Newsreader, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  SITE_NAME,
  SITE_URL,
  HOMEPAGE_TITLE,
  HOMEPAGE_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  getBrandJsonLd,
} from '@/lib/seo/metadata';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
  adjustFontFallback: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  adjustFontFallback: false,
});

const defaultOgImageUrl = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;

export const metadata: Metadata = {
  title: HOMEPAGE_TITLE,
  description: HOMEPAGE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  openGraph: {
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: defaultOgImageUrl,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Emotional Intelligence & Holistic Wellbeing`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    images: [defaultOgImageUrl],
  },
  icons: {
    icon: [
      { url: '/images/soulfulli-icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/soulfulli-icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/images/soulfulli-icon-48.png',
    apple: [
      {
        url: '/images/soulfulli-apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

const brandStructuredData = getBrandJsonLd();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-background text-on-surface font-sans antialiased min-h-screen flex flex-col selection:bg-sage/20 selection:text-forest">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandStructuredData) }}
        />
        <Header />
        <main className="flex-1 w-full pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
