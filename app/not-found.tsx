import Link from "next/link"
import { ChevronLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="rounded-full bg-muted p-8">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 - Page Not Found</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Sorry, we couldn't find the page you're looking for. The business, category, or city may not exist.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/aurora-il/all">
                    Browse All Services
                  </Link>
                </Button>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl">
                <Link href="/aurora-il/plumbers" className="group rounded-lg border p-4 hover:bg-muted transition-colors">
                  <h3 className="font-medium">Plumbers</h3>
                  <p className="text-sm text-muted-foreground">Find trusted plumbers in Aurora, IL</p>
                </Link>
                <Link href="/aurora-il/hvac" className="group rounded-lg border p-4 hover:bg-muted transition-colors">
                  <h3 className="font-medium">HVAC Services</h3>
                  <p className="text-sm text-muted-foreground">Heating, ventilation, and air conditioning experts</p>
                </Link>
                <Link href="/aurora-il/contractors" className="group rounded-lg border p-4 hover:bg-muted transition-colors">
                  <h3 className="font-medium">General Contractors</h3>
                  <p className="text-sm text-muted-foreground">Home improvement and renovation specialists</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 