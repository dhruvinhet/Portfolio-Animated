import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Block any private directories if you ever make them
    },
    sitemap: 'https://dhruvinpatel.me/sitemap.xml',
  }
}
