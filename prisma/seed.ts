import { PrismaClient } from '@prisma/client'
import { slugify } from '../lib/utils'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.business.deleteMany({})

  // Sample data
  const businesses = [
    {
      name: 'Acme Plumbing',
      category: 'plumbers',
      city: 'aurora-il',
      phone: '6305551234',
      email: 'info@acmeplumbing.com',
      website: 'acmeplumbing.com',
      address: '123 Main St, Aurora, IL',
      zip: '60505',
      description: 'Professional plumbing services for residential and commercial properties. Available 24/7 for emergency repairs.',
      isFeatured: true,
    },
    {
      name: 'Cool Air HVAC',
      category: 'hvac',
      city: 'aurora-il',
      phone: '6305552345',
      email: 'service@coolair.com',
      website: 'coolair.com',
      address: '456 Oak Ave, Aurora, IL',
      zip: '60506',
      description: 'Heating, ventilation, and air conditioning services. Specializing in installation, maintenance, and repairs.',
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

  console.log(`Database has been seeded with ${businesses.length} businesses.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 