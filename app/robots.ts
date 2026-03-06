import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://digibouquet.tams.codes/sitemap.xml',
    host: 'https://digibouquet.tams.codes',
  };
}
