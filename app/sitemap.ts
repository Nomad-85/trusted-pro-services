import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aurora-il-services.vercel.app'
  
  // Get all businesses
  const businesses = await prisma.business.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  })
  
  // Get all categories
  const categories = await prisma.business.groupBy({
    by: ['category'],
  })
  
  // Get all cities
  const cities = await prisma.business.groupBy({
    by: ['city'],
  })
  
  // Create sitemap entries
  const businessEntries = businesses.map((business) => ({
    url: `${baseUrl}/business/${business.slug}`,
    lastModified: business.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  const categoryEntries = categories.flatMap((category) => 
    cities.map((city) => ({
      url: `${baseUrl}/${city.city}/${category.category}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  )
  
  const cityEntries = cities.map((city) => ({
    url: `${baseUrl}/${city.city}/all`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]
  
  return [...staticPages, ...businessEntries, ...categoryEntries, ...cityEntries]
} 