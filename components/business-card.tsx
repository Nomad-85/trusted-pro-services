import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Globe, Mail, MapPin, Star } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BusinessCardProps {
  id: string
  name: string
  description: string
  phone: string
  featured?: boolean
  address?: string | null
  website?: string | null
  email?: string | null
  slug: string
}

export default function BusinessCard({ 
  id,
  name, 
  description, 
  phone, 
  featured = false,
  address,
  website,
  email,
  slug
}: BusinessCardProps) {
  return (
    <Card className={cn(
      "h-full flex flex-col transition-all",
      featured && "border-primary/50 shadow-md relative"
    )}>
      {featured && (
        <div className="absolute -top-3 -right-3">
          <Badge className="bg-primary text-primary-foreground shadow-sm">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Featured
          </Badge>
        </div>
      )}
      <CardHeader className={cn(
        featured && "bg-primary/5 rounded-t-lg"
      )}>
        <div className="flex justify-between items-start">
          <Link href={`/business/${slug}`} className="hover:underline">
            <CardTitle className="text-xl">{name}</CardTitle>
          </Link>
        </div>
        <CardDescription className="mt-2 line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start mt-auto gap-2 pt-6">
        {address && (
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="line-clamp-1">{address}</span>
          </div>
        )}
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{phone}</span>
        </div>
        {email && (
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="line-clamp-1">{email}</span>
          </div>
        )}
        <div className="flex justify-between items-center w-full mt-4">
          {website && (
            <Button variant="outline" size="sm" asChild>
              <a href={website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Website
              </a>
            </Button>
          )}
          <Button asChild className={cn(
            featured && "bg-primary hover:bg-primary/90"
          )}>
            <Link href={`/business/${slug}`}>
              <Phone className="h-4 w-4 mr-2" />
              Contact
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
