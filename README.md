# Aurora IL Services Directory

A local business directory for service providers in Aurora, Illinois.

## Features

- Dynamic routing for service categories and cities
- PostgreSQL database with Prisma ORM
- Admin CSV importer for bulk business listings
- Responsive design with Shadcn UI components
- Dark/light mode support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aurora-il-services.git
   cd aurora-il-services
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```
   # Create a .env file with your database connection string
   DATABASE_URL="postgresql://username:password@localhost:5432/aurora_services?schema=public"
   ```

4. Set up the database:
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run migrations
   npm run prisma:migrate
   
   # Seed the database with sample data
   npm run prisma:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin CSV Upload

To upload business listings in bulk:

1. Navigate to [http://localhost:3000/admin/upload](http://localhost:3000/admin/upload)
2. Prepare a CSV file with the following headers:
   - Business Name (required)
   - Category (required)
   - City (required)
   - Phone (required)
   - Email
   - Website
   - Address
   - Zip
   - Description
   - IsFeatured (true/false or 1/0)
3. Upload the CSV file and follow the on-screen instructions

## License

This project is licensed under the MIT License - see the LICENSE file for details. 