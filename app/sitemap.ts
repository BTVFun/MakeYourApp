// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://makeyourapp.eu/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://makeyourapp.eu/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://makeyourapp.eu/legal', changeFrequency: 'yearly', priority: 0.3 },
  ];
}
