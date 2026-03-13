import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dhruvinpatel.me',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add any future blog or project routes here as they grow:
    // {
    //   url: 'https://dhruvinpatel.me/deepfake-detection',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}
