import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'], // Keep crawlers out of internal system files
    },
    sitemap: 'https://richie-christian-de-guzman.vercel.app/',
  }
}
