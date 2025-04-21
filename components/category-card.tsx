import Link from "next/link"
import { Wrench, Thermometer, FileSignature, HardHat, Home, Sparkles, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  icon: string
  name: string
  href: string
}

export default function CategoryCard({ icon, name, href }: CategoryCardProps) {
  const IconMap: Record<string, LucideIcon> = {
    Wrench,
    Thermometer,
    FileSignature,
    HardHat,
    Home,
    Sparkles,
  }

  const Icon = IconMap[icon] || Wrench

  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:bg-muted/50">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Icon className="h-10 w-10 mb-2" />
          <h3 className="text-center font-medium">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}
