"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, AlertCircle, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface BusinessData {
  name: string
  category: string
  city: string
  phone: string
  email?: string
  website?: string
  address?: string
  zip?: string
  description?: string
  isFeatured: boolean
}

export default function AdminUploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [businesses, setBusinesses] = useState<BusinessData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setError(null)
    setIsSuccess(false)
  }

  const parseCSV = async () => {
    if (!file) {
      setError("Please select a file first")
      return
    }

    if (!file.name.endsWith('.csv')) {
      setError("Please upload a CSV file")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const text = await file.text()
      const rows = text.split('\n')
      
      // Parse headers
      const headers = rows[0].split(',').map(h => h.trim())
      
      // Check required headers
      const requiredHeaders = ['Business Name', 'Category', 'City', 'Phone']
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h))
      
      if (missingHeaders.length > 0) {
        setError(`Missing required headers: ${missingHeaders.join(', ')}`)
        setIsLoading(false)
        return
      }
      
      // Parse data rows
      const parsedBusinesses: BusinessData[] = []
      
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue
        
        const values = rows[i].split(',').map(v => v.trim())
        
        if (values.length !== headers.length) {
          setError(`Row ${i} has incorrect number of columns`)
          setIsLoading(false)
          return
        }
        
        const business: any = {}
        
        headers.forEach((header, index) => {
          switch (header) {
            case 'Business Name':
              business.name = values[index]
              break
            case 'Category':
              business.category = values[index].toLowerCase()
              break
            case 'City':
              business.city = values[index].toLowerCase().replace(/\s+/g, '-')
              break
            case 'Phone':
              business.phone = values[index]
              break
            case 'Email':
              business.email = values[index] || undefined
              break
            case 'Website':
              business.website = values[index] || undefined
              break
            case 'Address':
              business.address = values[index] || undefined
              break
            case 'Zip':
              business.zip = values[index] || undefined
              break
            case 'Description':
              business.description = values[index] || undefined
              break
            case 'IsFeatured':
              business.isFeatured = values[index].toLowerCase() === 'true' || values[index] === '1'
              break
          }
        })
        
        // Validate required fields
        if (!business.name || !business.category || !business.city || !business.phone) {
          setError(`Row ${i} is missing required fields`)
          setIsLoading(false)
          return
        }
        
        parsedBusinesses.push(business as BusinessData)
      }
      
      setBusinesses(parsedBusinesses)
      setIsLoading(false)
    } catch (err) {
      setError("Failed to parse CSV file")
      setIsLoading(false)
    }
  }

  const handleImport = async () => {
    if (businesses.length === 0) {
      setError("No businesses to import")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businesses }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to import businesses")
      }

      setIsSuccess(true)
      setBusinesses([])
      setFile(null)
      setIsLoading(false)
      
      // Refresh the page data
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to import businesses")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin CSV Uploader</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Upload Business Listings</CardTitle>
              <CardDescription>
                Upload a CSV file containing business listings to import into the database.
                The CSV should include headers: Business Name, Category, City, Phone, Email, Website, Address, Zip, Description, IsFeatured.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="csv">CSV File</Label>
                <Input
                  id="csv"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </div>
              
              {file && (
                <div className="flex items-center gap-2 mt-4">
                  <FileText className="h-4 w-4" />
                  <span>{file.name}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={parseCSV}
                    disabled={isLoading}
                  >
                    Parse CSV
                  </Button>
                </div>
              )}
              
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {isSuccess && (
                <Alert className="mt-4">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Businesses imported successfully!</AlertDescription>
                </Alert>
              )}
              
              {businesses.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Preview ({businesses.length} businesses)</h3>
                  <div className="border rounded-md overflow-auto max-h-96">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Business Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Featured</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {businesses.map((business, index) => (
                          <TableRow key={index}>
                            <TableCell>{business.name}</TableCell>
                            <TableCell>{business.category}</TableCell>
                            <TableCell>{business.city}</TableCell>
                            <TableCell>{business.phone}</TableCell>
                            <TableCell>{business.isFeatured ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
            {businesses.length > 0 && (
              <CardFooter>
                <Button 
                  onClick={handleImport} 
                  disabled={isLoading}
                  className="ml-auto"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import {businesses.length} Businesses
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 