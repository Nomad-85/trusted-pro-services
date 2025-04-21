import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { slugify } from "@/lib/utils"

export async function POST(req: NextRequest) {
  try {
    // In a real app, you would check authentication here
    // if (!isAuthenticated(req)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }
    
    const { businesses } = await req.json()
    
    if (!Array.isArray(businesses) || businesses.length === 0) {
      return NextResponse.json({ error: "No businesses provided" }, { status: 400 })
    }
    
    const results = {
      created: 0,
      updated: 0,
      errors: 0,
    }
    
    for (const business of businesses) {
      try {
        // Check for required fields
        if (!business.name || !business.category || !business.city || !business.phone) {
          results.errors++
          continue
        }
        
        // Generate slug
        const slug = slugify(`${business.name}-${business.city}`)
        
        // Check if business already exists
        const existingBusiness = await prisma.business.findFirst({
          where: {
            name: business.name,
            city: business.city,
          },
        })
        
        if (existingBusiness) {
          // Update existing business
          await prisma.business.update({
            where: { id: existingBusiness.id },
            data: {
              ...business,
              slug,
              updatedAt: new Date(),
            },
          })
          
          results.updated++
        } else {
          // Create new business
          await prisma.business.create({
            data: {
              ...business,
              slug,
            },
          })
          
          results.created++
        }
      } catch (err) {
        console.error("Error processing business:", err)
        results.errors++
      }
    }
    
    return NextResponse.json({ 
      message: "Import completed", 
      results 
    })
  } catch (error) {
    console.error("Import error:", error)
    return NextResponse.json({ error: "Failed to import businesses" }, { status: 500 })
  }
} 