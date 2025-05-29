import { appConfig } from 'config/appConfig';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: '/dashboard', // example
    },
    host: appConfig.SITE_URL,
    sitemap: `${appConfig.SITE_URL}/sitemap.xml`,
  };
}
