import Link from "next/link"
import { Wrench, Thermometer, FileSignature, HardHat, Home, Sparkles, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  icon: React.ReactNode
  name: string
  href: string
  count: number
}

export default function CategoryCard({ icon, name, href, count }: CategoryCardProps) {
  const IconMap: Record<string, LucideIcon> = {
    Wrench,
    Thermometer,
    FileSignature,
    HardHat,
    Home,
    Sparkles,
  }

  const Icon = IconMap[icon as string] || Wrench

  return (
    <Link href={href}>
      <Card className="h-full transition-colors hover:bg-accent">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
            {Icon}
          </div>
          <h3 className="text-center text-base font-medium">{name}</h3>
          <p className="text-center text-sm text-muted-foreground">{count} listings</p>
        </CardContent>
      </Card>
    </Link>
  )
}
