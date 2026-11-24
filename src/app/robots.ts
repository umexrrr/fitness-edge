import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dashboard/private'],
    },
    sitemap: 'https://kinetixclub.demo/sitemap.xml',
  };
}
