import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { slugify } from './lib/utils'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Handle old routes if needed
  // For example, if you had routes like /businesses/123 before
  if (pathname.startsWith('/businesses/')) {
    const id = pathname.split('/')[2]
    
    // You would need to fetch the business by ID and get its slug
    // This is a simplified example
    try {
      // In a real implementation, you would query your database here
      // const business = await db.business.findUnique({ where: { id } })
      // if (business) {
      //   return NextResponse.redirect(new URL(`/business/${business.slug}`, request.url))
      // }
      
      // For now, just redirect to the homepage
      return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
      console.error('Error redirecting old route:', error)
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/businesses/:path*'],
} 