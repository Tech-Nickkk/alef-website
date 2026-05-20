import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/studio/',
        '/login',
        '/profile',
        '/donate/success',
        '/submit-article',
        '/submit-podcast',
        '/submit-webinar',
        '/submit-video',
        '/submit-short',
      ],
    },
    sitemap: 'https://www.usalef.org/sitemap.xml',
  };
}
