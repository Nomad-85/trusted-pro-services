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
  
  const business = await prisma.business.findUnique({
    where: { slug }
  })
  
  if (!business) {
    notFound()
  }
  
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
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      {business.name}
                    </h1>
                    {business.isFeatured && (
                      <Badge className="ml-2">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    {categoryDisplay} in {cityDisplay}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button asChild>
                    <a href={`tel:${business.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  {business.email && (
                    <Button variant="outline" asChild>
                      <a href={`mailto:${business.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About</h2>
                    <p className="text-muted-foreground">
                      {business.description || "No description provided."}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Placeholder for reviews or additional content */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Services</h2>
                    <p className="text-muted-foreground">
                      Contact this business directly to learn more about their services and availability.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">{formatPhoneNumber(business.phone)}</p>
                        </div>
                      </div>
                      
                      {business.email && (
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-muted-foreground">{business.email}</p>
                          </div>
                        </div>
                      )}
                      
                      {business.website && (
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Website</p>
                            <a 
                              href={business.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {business.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {business.address && (
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Address</p>
                            <p className="text-muted-foreground">{business.address}</p>
                            {business.zip && (
                              <p className="text-muted-foreground">{business.zip}</p>
                            )}
                          </div>
                        </div>
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