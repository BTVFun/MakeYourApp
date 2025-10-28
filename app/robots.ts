// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL || 'https://makeyourapp.eu').replace(/\/$/, '');

  const isProd =
    process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  // En non-prod : on bloque l'indexation
  if (!isProd) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
      host: baseUrl,
    };
  }

  // En prod : on autorise tout (avec quelques chemins techniques désindexés)
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_next/*', '/static/*', '/private/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
