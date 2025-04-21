import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import CategoryCard from "@/components/category-card"
import BusinessCard from "@/components/business-card"
import { Wrench, Thermometer, FileSignature, HardHat, Home as HomeIcon, Sparkles } from "lucide-react"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface CategoryCardProps {
  icon: React.ReactNode
  name: string
  href: string
  count: number
}

function CategoryCard({ icon, name, href, count }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition-colors hover:bg-accent">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
            {icon}
          </div>
          <h3 className="text-center text-base font-medium">{name}</h3>
          <p className="text-center text-sm text-muted-foreground">{count} listings</p>
        </CardContent>
      </Card>
    </Link>
  )
}

async function searchBusinesses(formData: FormData) {
  "use server"
  
  const searchQuery = formData.get("search") as string
  
  if (!searchQuery) {
    return
  }
  
  // Redirect to the search results page
  redirect(`/aurora-il/all?q=${encodeURIComponent(searchQuery)}`)
}

export default async function Home() {
  // Get counts for each category
  const categoryCounts = await prisma.business.groupBy({
    by: ['category'],
    _count: {
      id: true
    },
    where: {
      city: 'aurora-il'
    }
  })

  // Create a map of category to count
  const countMap = categoryCounts.reduce((acc, curr) => {
    acc[curr.category] = curr._count.id
    return acc
  }, {} as Record<string, number>)

  // Get featured businesses
  const featuredBusinesses = await prisma.business.findMany({
    where: {
      isFeatured: true,
      city: 'aurora-il'
    },
    orderBy: {
      name: 'asc'
    },
    take: 3
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Find Trusted Service Providers in Aurora, IL
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Connect with top-rated local professionals for all your service needs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form action={searchBusinesses} className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="search"
                    name="search"
                    placeholder="Search for services..."
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Browse Services by Category</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find the right professional for your needs in Aurora, Illinois.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
              <CategoryCard 
                icon={<Wrench className="h-6 w-6" />} 
                name="Plumbers" 
                href="/aurora-il/plumbers" 
                count={countMap['plumbers'] || 0} 
              />
              <CategoryCard 
                icon={<Thermometer className="h-6 w-6" />} 
                name="HVAC" 
                href="/aurora-il/hvac" 
                count={countMap['hvac'] || 0} 
              />
              <CategoryCard 
                icon={<FileSignature className="h-6 w-6" />} 
                name="Notaries" 
                href="/aurora-il/notaries" 
                count={countMap['notaries'] || 0} 
              />
              <CategoryCard 
                icon={<HardHat className="h-6 w-6" />} 
                name="General Contractors" 
                href="/aurora-il/contractors" 
                count={countMap['contractors'] || 0} 
              />
              <CategoryCard 
                icon={<HomeIcon className="h-6 w-6" />} 
                name="Roofers" 
                href="/aurora-il/roofers" 
                count={countMap['roofers'] || 0} 
              />
              <CategoryCard 
                icon={<Sparkles className="h-6 w-6" />} 
                name="Cleaners" 
                href="/aurora-il/cleaners" 
                count={countMap['cleaners'] || 0} 
              />
            </div>
          </div>
        </section>

        {featuredBusinesses.length > 0 && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Businesses</h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Top-rated service providers in Aurora, Illinois.
                  </p>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {featuredBusinesses.map((business) => (
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
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
