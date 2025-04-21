"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"

interface FilterOption {
  value: string
  label: string
  count: number
}

interface SearchFilterProps {
  currentCategory: string
  currentCity: string
  categories: FilterOption[]
  cities: FilterOption[]
  searchQuery: string
}

export default function SearchFilter({
  currentCategory,
  currentCity,
  categories,
  cities,
  searchQuery,
}: SearchFilterProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(searchQuery)
  const [category, setCategory] = useState(currentCategory)
  const [city, setCity] = useState(currentCity)
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    startTransition(() => {
      const params = new URLSearchParams()
      if (search) {
        params.set("q", search)
      }
      
      router.push(`/${city}/${category}${params.toString() ? `?${params.toString()}` : ''}`)
    })
  }
  
  const handleCategoryChange = (value: string) => {
    setCategory(value)
    startTransition(() => {
      router.push(`/${city}/${value}`)
    })
  }
  
  const handleCityChange = (value: string) => {
    setCity(value)
    startTransition(() => {
      router.push(`/${value}/${category}`)
    })
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <form onSubmit={handleSearch} className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search businesses..."
            className="w-full pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          Search
        </Button>
      </form>
      
      <div className="flex gap-2">
        <div className="hidden md:block">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label} ({cat.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="hidden md:block">
          <Select value={city} onValueChange={handleCityChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label} ({c.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Filter businesses by category and city
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="mobile-category">Category</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="mobile-category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label} ({cat.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile-city">City</Label>
                <Select value={city} onValueChange={handleCityChange}>
                  <SelectTrigger id="mobile-city">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label} ({c.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
} 