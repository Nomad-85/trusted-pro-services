import { PrismaClient } from '@prisma/client'
import { slugify } from '../lib/utils'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.business.deleteMany({})

  // Sample data
  const businesses = [
    {
      name: 'Aurora Plumbing Pros',
      category: 'plumbers',
      city: 'aurora-il',
      phone: '(630) 555-1234',
      email: 'info@auroraplumbingpros.com',
      website: 'https://auroraplumbingpros.com',
      address: '123 Main St, Aurora, IL 60505',
      zip: '60505',
      description: 'Family-owned plumbing service with 20+ years of experience in residential and commercial repairs.',
      isFeatured: true,
    },
    {
      name: 'Fox Valley HVAC Solutions',
      category: 'hvac',
      city: 'aurora-il',
      phone: '(630) 555-5678',
      email: 'service@foxvalleyhvac.com',
      website: 'https://foxvalleyhvac.com',
      address: '456 State St, Aurora, IL 60506',
      zip: '60506',
      description: 'Certified HVAC technicians providing heating, cooling, and ventilation services with 24/7 emergency support.',
      isFeatured: true,
    },
    {
      name: 'Illinois Notary Express',
      category: 'notaries',
      city: 'aurora-il',
      phone: '(630) 555-9012',
      email: 'appointments@ilnotaryexpress.com',
      website: 'https://ilnotaryexpress.com',
      address: '789 River Rd, Aurora, IL 60506',
      zip: '60506',
      description: 'Mobile notary service available evenings and weekends. Specializing in real estate, wills, and power of attorney.',
      isFeatured: true,
    },
    {
      name: 'Aurora Roofing Experts',
      category: 'roofers',
      city: 'aurora-il',
      phone: '(630) 555-3456',
      email: 'info@auroraroofingexperts.com',
      website: 'https://auroraroofingexperts.com',
      address: '101 Oak Ave, Aurora, IL 60505',
      zip: '60505',
      description: 'Professional roofing contractors specializing in residential and commercial roof repairs, replacements, and inspections.',
      isFeatured: false,
    },
    {
      name: 'Sparkle Clean Aurora',
      category: 'cleaners',
      city: 'aurora-il',
      phone: '(630) 555-7890',
      email: 'schedule@sparklecleanaurora.com',
      website: 'https://sparklecleanaurora.com',
      address: '202 Maple St, Aurora, IL 60506',
      zip: '60506',
      description: 'Eco-friendly residential and commercial cleaning services. Weekly, bi-weekly, and one-time deep cleaning available.',
      isFeatured: false,
    },
    {
      name: 'Aurora General Contractors',
      category: 'contractors',
      city: 'aurora-il',
      phone: '(630) 555-2345',
      email: 'projects@auroragc.com',
      website: 'https://auroragc.com',
      address: '303 Pine Ln, Aurora, IL 60505',
      zip: '60505',
      description: 'Full-service general contractors for home renovations, additions, and commercial construction projects.',
      isFeatured: false,
    },
  ]

  for (const business of businesses) {
    await prisma.business.create({
      data: {
        ...business,
        slug: slugify(`${business.name}-${business.city}`),
      },
    })
  }

  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 