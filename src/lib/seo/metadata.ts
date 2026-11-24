import type { Metadata } from 'next';

export const SITE_NAME = 'SoulfulI';
export const SITE_ALTERNATE_NAME = 'Soulfulli';
export const SITE_URL = 'https://www.soulfuli.org';
export const OFFICIAL_EMAIL = 'connect@soulfuli.org';
export const INSTAGRAM_URL =
  'https://www.instagram.com/soulfuli_official?obrf=NzlubWljcXcwbW9o&utm_source=qr';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/soulfuli/';
export const WHATSAPP_CHANNEL_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL?.trim() || '';
export const RETREAT_BROCHURE_URL =
  '/brochures/soulfulli-retreat-brochure.pdf';

export const OFFICIAL_LOGO_PATH = '/images/soulfulli-logo.png';
export const OFFICIAL_LOGO_WIDTH = 379;
export const OFFICIAL_LOGO_HEIGHT = 191;
export const DEFAULT_OG_IMAGE_PATH = '/images/og-soulfuli.png';

export const COMPANY_NAME = 'SOULFULL Collective LLP';
export const OFFICE_ADDRESS =
  '252-A, Office No. 303, Second Floor, Lakshaydeep Building, Sant Nagar, East of Kailash, Delhi, India – 110065.';
export const OFFICIAL_PHONES = [
  { display: '+91 9137878270', tel: '+919137878270' },
  { display: '+91 6202781011', tel: '+916202781011' },
] as const;

export const HOMEPAGE_TITLE =
  'SoulfulI – Emotional Intelligence & Holistic Wellbeing';
export const HOMEPAGE_DESCRIPTION =
  'Discover SoulfulI, a space for emotional intelligence, holistic wellbeing, experiential learning and transformative retreats. Explore workshops, corporate training and the Soulful Intelligence EQ Audit.';

export function getBrandJsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const logoId = `${SITE_URL}/#logo`;
  const sameAs = [
    INSTAGRAM_URL,
    LINKEDIN_URL,
    ...(WHATSAPP_CHANNEL_URL ? [WHATSAPP_CHANNEL_URL] : []),
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE_NAME,
        alternateName: SITE_ALTERNATE_NAME,
        legalName: COMPANY_NAME,
        url: `${SITE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          '@id': logoId,
          url: `${SITE_URL}${OFFICIAL_LOGO_PATH}`,
          contentUrl: `${SITE_URL}${OFFICIAL_LOGO_PATH}`,
          width: OFFICIAL_LOGO_WIDTH,
          height: OFFICIAL_LOGO_HEIGHT,
          caption: `${SITE_NAME} — bridging intellect & emotion`,
        },
        image: {
          '@id': logoId,
        },
        email: OFFICIAL_EMAIL,
        telephone: OFFICIAL_PHONES[0].tel,
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            '252-A, Office No. 303, Second Floor, Lakshaydeep Building, Sant Nagar, East of Kailash',
          addressLocality: 'New Delhi',
          addressRegion: 'Delhi',
          postalCode: '110065',
          addressCountry: 'IN',
        },
        contactPoint: OFFICIAL_PHONES.map((phone) => ({
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: phone.tel,
          email: OFFICIAL_EMAIL,
          areaServed: 'IN',
          availableLanguage: ['en'],
        })),
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE_NAME,
        alternateName: SITE_ALTERNATE_NAME,
        url: `${SITE_URL}/`,
        description: HOMEPAGE_DESCRIPTION,
        inLanguage: 'en',
        publisher: {
          '@id': orgId,
        },
      },
    ],
  };
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  imagePath?: string;
  imageAlt?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  type = 'website',
  imagePath = DEFAULT_OG_IMAGE_PATH,
  imageAlt = `${SITE_NAME} — Emotional Intelligence & Holistic Wellbeing`,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const ogImageUrl = imagePath.startsWith('http')
    ? imagePath
    : `${SITE_URL}${imagePath}`;

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
      locale: 'en_IN',
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
