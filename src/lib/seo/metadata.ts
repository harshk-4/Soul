import type { Metadata } from 'next';

export const SITE_NAME = 'Soulfuli';
export const SITE_URL = 'https://www.soulfuli.org';
export const OFFICIAL_EMAIL = 'soulfuli.global@gmail.com';
export const INSTAGRAM_URL =
  'https://www.instagram.com/soulfuli_official?obrf=NzlubWljcXcwbW9o&utm_source=qr';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/soulfuli/';
export const WHATSAPP_CHANNEL_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL?.trim() || '';
export const RETREAT_BROCHURE_URL =
  '/brochures/soulfulli-retreat-brochure.pdf';

export const COMPANY_NAME = 'SOULFULL Collective LLP';
export const OFFICE_ADDRESS =
  '252-A, Office No. 303, Second Floor, Lakshaydeep Building, Sant Nagar, East of Kailash, Delhi – 110065.';
export const OFFICIAL_PHONES = [
  { display: '9137878270', tel: '+919137878270' },
  { display: '6202781011', tel: '+916202781011' },
] as const;

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
}

export function createPageMetadata({
  title,
  description,
  path,
  type = 'website',
}: PageMetadataOptions): Metadata {
  const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

