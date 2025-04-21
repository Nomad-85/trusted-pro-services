import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Mail, MapPin, Phone, Globe, Star } from "lucide-react"

import { prisma } from "@/lib/db"
import { formatPhoneNumber } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface BusinessPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = params
  
  const business = await prisma.business.findUnique({
    where: { slug }
  })
  
  if (!business) {
    return {
      title: 'Business Not Found',
      description: 'The requested business could not be found.'
    }
  }
  
  return {
    title: `${business.name} - Aurora IL Services`,
    description: business.description || `Contact information and details for ${business.name} in Aurora, IL.`,
  }
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { slug } = params
  
  // Get business details
  const business = await prisma.business.findUnique({
    where: { slug }
  })
  
  if (!business) {
    notFound()
  }
  
  // Increment view count
  await prisma.business.update({
    where: { id: business.id },
    data: { viewCount: { increment: 1 } }
  })
  
  // Format city name for display (e.g., "aurora-il" -> "Aurora, IL")
  const cityDisplay = business.city
    .split('-')
    .map(part => part.toUpperCase() === 'IL' ? 'IL' : part.charAt(0).toUpperCase() + part.slice(1))
    .join(', ')
  
  // Format category name for display (e.g., "plumbers" -> "Plumbers")
  const categoryDisplay = business.category.charAt(0).toUpperCase() + business.category.slice(1)
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link href={`/${business.city}/${business.category}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to {categoryDisplay}
                </Link>
              </Button>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{business.name}</h1>
                {business.isFeatured && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <Link 
                  href={`/${business.city}/${business.category}`}
                  className="hover:underline flex items-center"
                >
                  <span className="mr-2">Category:</span>
                  <Badge variant="outline">{categoryDisplay}</Badge>
                </Link>
                <Link 
                  href={`/${business.city}/all`}
                  className="hover:underline flex items-center"
                >
                  <span className="mr-2">Location:</span>
                  <Badge variant="outline">{cityDisplay}</Badge>
                </Link>
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About</h2>
                    {business.description ? (
                      <p className="text-muted-foreground whitespace-pre-line">{business.description}</p>
                    ) : (
                      <p className="text-muted-foreground italic">No description provided.</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 mr-2 text-primary" />
                          <p className="font-medium">Phone</p>
                        </div>
                        <p className="text-muted-foreground">
                          <a href={`tel:${business.phone}`} className="hover:underline">
                            {formatPhoneNumber(business.phone)}
                          </a>
                        </p>
                      </div>
                      
                      {business.email && (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-primary" />
                            <p className="font-medium">Email</p>
                          </div>
                          <p className="text-muted-foreground">
                            <a href={`mailto:${business.email}`} className="hover:underline">
                              {business.email}
                            </a>
                          </p>
                        </div>
                      )}
                      
                      {business.website && (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center">
                            <Globe className="h-5 w-5 mr-2 text-primary" />
                            <p className="font-medium">Website</p>
                          </div>
                          <p className="text-muted-foreground">
                            <a 
                              href={business.website.startsWith('http') ? business.website : `https://${business.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {business.website.replace(/^https?:\/\//i, '')}
                            </a>
                          </p>
                        </div>
                      )}
                      
                      {business.address && (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-primary" />
                            <p className="font-medium">Address</p>
                          </div>
                          <p className="text-muted-foreground">{business.address}</p>
                          {business.zip && (
                            <p className="text-muted-foreground">{business.zip}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Contact Now</h2>
                    <div className="space-y-4">
                      <Button className="w-full" size="lg" asChild>
                        <a href={`tel:${business.phone}`}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call {formatPhoneNumber(business.phone)}
                        </a>
                      </Button>
                      
                      {business.email && (
                        <Button variant="outline" className="w-full" size="lg" asChild>
                          <a href={`mailto:${business.email}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </a>
                        </Button>
                      )}
                      
                      {business.website && (
                        <Button variant="outline" className="w-full" size="lg" asChild>
                          <a 
                            href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="mr-2 h-4 w-4" />
                            Visit Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Map placeholder */}
                {business.address && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Location</h2>
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Map placeholder</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {business.address}
                        {business.zip && `, ${business.zip}`}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 