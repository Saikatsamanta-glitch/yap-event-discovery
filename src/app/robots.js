const applicationENV = process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT;
const baseUrl = process.env.NEXT_PUBLIC_HOST_URL;

export default function robots() {
  const isProduction = applicationENV === 'production';
  let config = {};

  if (isProduction) {
    config = {
      allow: '/',
      disallow: [
        '/static/*',
        '/_next/static/media/d869208648ca5469-s.p.woff2',
        '/_next/static/media/916d3686010a8de2-s.p.woff2',
        '/bot',
        '/_next/static/media/7777133e901cd5ed-s.p.woff2',
        '/site.webmanifest',
        '/favicon.ico',
      ],
    };
  } else {
    config = {
      disallow: [
        '/',
        '/static/*',
        '/_next/static/media/d869208648ca5469-s.p.woff2',
        '/_next/static/media/916d3686010a8de2-s.p.woff2',
        '/bot',
        '/_next/static/media/7777133e901cd5ed-s.p.woff2',
        '/site.webmanifest',
        '/favicon.ico',
      ],
    };
  }

  return {
    rules: {
      userAgent: '*',
      ...config,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
