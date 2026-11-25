import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import {
  createPageMetadata,
  getBrandJsonLd,
  SITE_NAME,
  SITE_ALTERNATE_NAME,
  COMPANY_NAME,
  SITE_URL,
  OFFICIAL_LOGO_PATH,
  DEFAULT_OG_IMAGE_PATH,
  WHATSAPP_CHANNEL_URL,
  QUIET_BLOOM_WHATSAPP_CHANNEL_URL,
} from '@/lib/seo/metadata';

describe('SEO, brand identity, canonical, structured data, sitemap, and robots configuration', () => {
  it('uses SoulfulI brand identity and https://www.soulfuli.org as preferred canonical origin', () => {
    expect(SITE_NAME).toBe('SoulfulI');
    expect(SITE_ALTERNATE_NAME).toBe('Soulfulli');
    expect(COMPANY_NAME).toBe('SOULFULL Collective LLP');
    expect(SITE_URL).toBe('https://www.soulfuli.org');

    const homeMeta = createPageMetadata({
      title: 'Home',
      description: 'Desc',
      path: '/',
    });
    expect(homeMeta.alternates?.canonical).toBe('https://www.soulfuli.org/');
    expect(homeMeta.robots).toMatchObject({ index: true, follow: true });
    expect(homeMeta.openGraph?.siteName).toBe('SoulfulI');
    expect(homeMeta.openGraph?.images).toBeDefined();
    expect(homeMeta.twitter?.images).toBeDefined();

    const storyMeta = createPageMetadata({
      title: 'Our Story',
      description: 'Desc',
      path: '/our-story',
    });
    expect(storyMeta.alternates?.canonical).toBe('https://www.soulfuli.org/our-story');
  });

  it('produces valid, connected Organization and WebSite JSON-LD structured data', () => {
    const schema = getBrandJsonLd();
    expect(schema['@context']).toBe('https://schema.org');
    expect(Array.isArray(schema['@graph'])).toBe(true);
    expect(schema['@graph']).toHaveLength(2);

    const org = schema['@graph'].find((n) => n['@type'] === 'Organization') as
      | Record<string, unknown>
      | undefined;
    const website = schema['@graph'].find((n) => n['@type'] === 'WebSite') as
      | Record<string, unknown>
      | undefined;

    expect(org).toBeDefined();
    expect(website).toBeDefined();

    expect(org?.['@id']).toBe('https://www.soulfuli.org/#organization');
    expect(org?.name).toBe('SoulfulI');
    expect(org?.legalName).toBe('SOULFULL Collective LLP');
    expect(org?.url).toBe('https://www.soulfuli.org/');
    expect((org?.logo as Record<string, unknown>)?.url).toBe(
      `https://www.soulfuli.org${OFFICIAL_LOGO_PATH}`
    );

    expect(website?.['@id']).toBe('https://www.soulfuli.org/#website');
    expect(website?.name).toBe('SoulfulI');
    expect(website?.alternateName).toBe('Soulfulli');
    expect(website?.url).toBe('https://www.soulfuli.org/');
    expect(website?.inLanguage).toBe('en');
    expect((website?.publisher as Record<string, unknown>)?.['@id']).toBe(
      'https://www.soulfuli.org/#organization'
    );
  });

  it('ensures official logo, Open Graph, and favicon brand assets exist on disk', () => {
    const brandAssets = [
      OFFICIAL_LOGO_PATH,
      DEFAULT_OG_IMAGE_PATH,
      '/images/soulfulli-icon-48.png',
      '/images/soulfulli-icon-192.png',
      '/images/soulfulli-apple-touch-icon.png',
    ];
    for (const asset of brandAssets) {
      const fullPath = path.join(process.cwd(), 'public', asset.replace(/^\//, ''));
      expect(fs.existsSync(fullPath)).toBe(true);
    }
  });

  it('generates sitemap entries only for existing public indexable pages on www', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls.length).toBeGreaterThanOrEqual(12);
    expect(new Set(urls).size).toBe(urls.length);

    for (const url of urls) {
      expect(url.startsWith('https://www.soulfuli.org')).toBe(true);
      expect(url).not.toContain('/api/');
      const relPath = url.replace('https://www.soulfuli.org', '').replace(/^\//, '');
      const pageFile = path.join(
        process.cwd(),
        'src',
        'app',
        relPath,
        'page.tsx'
      );
      expect(fs.existsSync(pageFile)).toBe(true);
    }
  });

  it('configures robots.txt with public allow, /api disallow, and www sitemap URL', () => {
    const cfg = robots();
    expect(cfg.sitemap).toBe('https://www.soulfuli.org/sitemap.xml');
    expect(cfg.rules).toMatchObject({
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    });
  });

  it('configures permanent non-www to www host redirect in next.config.mjs', async () => {
    const configMod = (await import('../../next.config.mjs')).default as {
      redirects?: () => Promise<
        Array<{
          source: string;
          has?: Array<{ type: string; value: string }>;
          destination: string;
          permanent: boolean;
        }>
      >;
    };
    const redirects = await configMod.redirects?.();
    expect(redirects).toEqual([
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'soulfuli.org' }],
        destination: 'https://www.soulfuli.org/:path*',
        permanent: true,
      },
    ]);
  });

  it('configures official Quiet Bloom WhatsApp Channel and includes it in social links', () => {
    expect(QUIET_BLOOM_WHATSAPP_CHANNEL_URL).toBe(
      'https://whatsapp.com/channel/0029VbDmzH90VycEedVzB92X'
    );
    expect(WHATSAPP_CHANNEL_URL).toBe(
      'https://whatsapp.com/channel/0029VbDmzH90VycEedVzB92X'
    );
    const schema = getBrandJsonLd();
    const org = schema['@graph'].find((n) => n['@type'] === 'Organization') as Record<string, unknown>;
    expect(org.sameAs).toContain('https://whatsapp.com/channel/0029VbDmzH90VycEedVzB92X');
  });
});
