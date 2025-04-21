import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import CategoryCard from "@/components/category-card"
import BusinessCard from "@/components/business-card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">AuroraILServices</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Find Trusted Local Services in Aurora, IL
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Browse top-rated plumbers, contractors, notaries, and more.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by service or zip code"
                    className="w-full bg-background pl-8"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Grid Section */}
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
              <CategoryCard icon="Wrench" name="Plumbers" href="/aurora-il/plumbers" />
              <CategoryCard icon="Thermometer" name="HVAC" href="/aurora-il/hvac" />
              <CategoryCard icon="FileSignature" name="Notaries" href="/aurora-il/notaries" />
              <CategoryCard icon="HardHat" name="General Contractors" href="/aurora-il/contractors" />
              <CategoryCard icon="Home" name="Roofers" href="/aurora-il/roofers" />
              <CategoryCard icon="Sparkles" name="Cleaners" href="/aurora-il/cleaners" />
            </div>
          </div>
        </section>

        {/* Featured Listings Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Businesses</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Top-rated service providers in Aurora that our community trusts.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <BusinessCard
                name="Aurora Plumbing Pros"
                description="Family-owned plumbing service with 20+ years of experience in residential and commercial repairs."
                phone="(630) 555-1234"
                featured={true}
              />
              <BusinessCard
                name="Fox Valley HVAC Solutions"
                description="Certified HVAC technicians providing heating, cooling, and ventilation services with 24/7 emergency support."
                phone="(630) 555-5678"
                featured={true}
              />
              <BusinessCard
                name="Illinois Notary Express"
                description="Mobile notary service available evenings and weekends. Specializing in real estate, wills, and power of attorney."
                phone="(630) 555-9012"
                featured={true}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Us</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  AuroraILServices.com helps residents discover reliable, verified service professionals in their area.
                  Listings are curated and updated weekly.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <Button asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} AuroraILServices. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
