import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Globe, Mail, MapPin } from "lucide-react"

interface BusinessCardProps {
  name: string
  description: string
  phone: string
  featured?: boolean
  address?: string | null
  website?: string | null
  email?: string | null
}

export default function BusinessCard({ 
  name, 
  description, 
  phone, 
  featured = false,
  address,
  website,
  email
}: BusinessCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
          {featured && <Badge className="ml-2">Featured</Badge>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start mt-auto gap-2">
        {address && (
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{address}</span>
          </div>
        )}
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{phone}</span>
        </div>
        {email && (
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{email}</span>
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
          <Button>
            <Phone className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
