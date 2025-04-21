import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

interface BusinessCardProps {
  name: string
  description: string
  phone: string
  featured?: boolean
}

export default function BusinessCard({ name, description, phone, featured = false }: BusinessCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
          {featured && <Badge className="ml-2">Featured</Badge>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          <span>{phone}</span>
        </div>
        <Button>Contact</Button>
      </CardFooter>
    </Card>
  )
}
