import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import BusinessCard from "@/components/business-card"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface CategoryPageProps {
  params: {
    city: string
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { city, category } = params
  
  // Format city name for display (e.g., "aurora-il" -> "Aurora, IL")
  const cityDisplay = city
    .split('-')
    .map(part => part.toUpperCase() === 'IL' ? 'IL' : part.charAt(0).toUpperCase() + part.slice(1))
    .join(', ')
  
  // Format category name for display (e.g., "plumbers" -> "Plumbers")
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1)
  
  return {
    title: `${categoryDisplay} in ${cityDisplay} - Aurora IL Services`,
    description: `Find trusted ${category} in ${cityDisplay}. Browse top-rated service providers with verified reviews and contact information.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { city, category } = params
  
  // Format city name for display (e.g., "aurora-il" -> "Aurora, IL")
  const cityDisplay = city
    .split('-')
    .map(part => part.toUpperCase() === 'IL' ? 'IL' : part.charAt(0).toUpperCase() + part.slice(1))
    .join(', ')
  
  // Format category name for display (e.g., "plumbers" -> "Plumbers")
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1)
  
  // Get businesses for this category and city
  const businesses = await prisma.business.findMany({
    where: {
      category: category.toLowerCase(),
      city: city.toLowerCase(),
    },
    orderBy: [
      { isFeatured: 'desc' },
      { name: 'asc' },
    ],
  })
  
  // If no businesses found, return 404
  if (businesses.length === 0) {
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
                {categoryDisplay} in {cityDisplay}
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Browse trusted {category} serving the {cityDisplay} area.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {businesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  name={business.name}
                  description={business.description || ''}
                  phone={business.phone}
                  featured={business.isFeatured}
                  address={business.address}
                  website={business.website}
                  email={business.email}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 