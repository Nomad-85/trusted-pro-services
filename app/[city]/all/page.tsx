import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import BusinessCard from "@/components/business-card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SearchFilter from "@/components/search-filter"
import Pagination from "@/components/pagination"

interface AllBusinessesPageProps {
  params: {
    city: string
  }
  searchParams: {
    q?: string
    page?: string
  }
}

const ITEMS_PER_PAGE = 12

export async function generateMetadata({ params, searchParams }: AllBusinessesPageProps): Promise<Metadata> {
  const { city } = params
  const { q } = searchParams
  
  // Format city name for display (e.g., "aurora-il" -> "Aurora, IL")
  const cityDisplay = city
    .split('-')
    .map(part => part.toUpperCase() === 'IL' ? 'IL' : part.charAt(0).toUpperCase() + part.slice(1))
    .join(', ')
  
  return {
    title: q 
      ? `Search results for "${q}" in ${cityDisplay} - Aurora IL Services`
      : `All Services in ${cityDisplay} - Aurora IL Services`,
    description: q
      ? `Search results for "${q}" in ${cityDisplay}. Find trusted service providers in Aurora, Illinois.`
      : `Browse all service providers in ${cityDisplay}. Find trusted professionals for your needs.`,
  }
}

export default async function AllBusinessesPage({ params, searchParams }: AllBusinessesPageProps) {
  const { city } = params
  const { q, page = "1" } = searchParams
  
  const currentPage = parseInt(page, 10) || 1
  const skip = (currentPage - 1) * ITEMS_PER_PAGE
  
  // Format city name for display (e.g., "aurora-il" -> "Aurora, IL")
  const cityDisplay = city
    .split('-')
    .map(part => part.toUpperCase() === 'IL' ? 'IL' : part.charAt(0).toUpperCase() + part.slice(1))
    .join(', ')
  
  // Get businesses for this city with optional search and pagination
  const where = {
    city: city.toLowerCase(),
    ...(q ? {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ],
    } : {}),
  }
  
  const [businesses, totalCount] = await Promise.all([
    prisma.business.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { name: 'asc' },
      ],
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.business.count({ where }),
  ])
  
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  
  // Get all categories for the filter
  const categories = await prisma.business.groupBy({
    by: ['category'],
    where: {
      city: city.toLowerCase(),
    },
    _count: {
      id: true,
    },
  })
  
  // Get all cities for the filter
  const cities = await prisma.business.groupBy({
    by: ['city'],
    _count: {
      id: true,
    },
  })
  
  // If no businesses found and no search query, return 404
  if (businesses.length === 0 && !q) {
    notFound()
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link href="/">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {q ? `Search results for "${q}"` : `All Services in ${cityDisplay}`}
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                {q 
                  ? `Found ${totalCount} results for "${q}" in ${cityDisplay}`
                  : `Browse all service providers in ${cityDisplay}`
                }
              </p>
            </div>
            
            <SearchFilter 
              currentCategory="all" 
              currentCity={city} 
              categories={[
                { value: 'all', label: 'All Services', count: 0 },
                ...categories.map(c => ({
                  value: c.category,
                  label: c.category.charAt(0).toUpperCase() + c.category.slice(1),
                  count: c._count.id
                }))
              ]}
              cities={cities.map(c => ({
                value: c.city,
                label: c.city
                  .split('-')
                  .map(part => part.toUpperCase() === 'IL' ? 'IL' : part.charAt(0).toUpperCase() + part.slice(1))
                  .join(', '),
                count: c._count.id
              }))}
              searchQuery={q || ''}
            />
            
            {businesses.length === 0 && q && (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold">No results found</h2>
                <p className="text-muted-foreground mt-2">
                  No businesses match your search for "{q}". Try a different search term or browse all listings.
                </p>
                <Button asChild className="mt-4">
                  <Link href={`/${city}/all`}>
                    View All Services
                  </Link>
                </Button>
              </div>
            )}
            
            {businesses.length > 0 && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                  {businesses.map((business) => (
                    <BusinessCard
                      key={business.id}
                      id={business.id}
                      name={business.name}
                      description={business.description || ''}
                      phone={business.phone}
                      featured={business.isFeatured}
                      address={business.address}
                      website={business.website}
                      email={business.email}
                      slug={business.slug}
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl={`/${city}/all${q ? `?q=${encodeURIComponent(q)}&` : '?'}`}
                  />
                )}
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 