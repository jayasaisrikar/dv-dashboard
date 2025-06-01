# Data Visualization Dashboard

A full-stack Next.js application for visualizing insights data using Chart.js and local JSON data.

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Setup Steps

1. **Clone the repository**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify the JSON data file**:
   - Ensure `jsondata.json` exists in the project root folder
   - The application will automatically read this file

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open in your browser**:
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Visit the Setup page to verify data loading

6. **Open [http://localhost:3000](http://localhost:3000) in your browser**

7. **Verify setup**: Navigate to the Setup page to confirm your database connection is working properly

## Dashboard Structure

- **Main Dashboard**: Overview with multiple chart types and statistics
- **Analytics Page**: Detailed analysis with configurable chart types
- **Filters Page**: Advanced data filtering and table view with pagination

## Available Filters

- End Year
- Topics
- Sectors 
- Regions
- PESTLE Categories
- Sources
- SWOT Categories
- Countries
- Cities

## Data Visualizations

- Intensity by Region (Bar Chart)
- Topic Distribution (Pie Chart)
- Intensity by Sector (Bar Chart)
- Yearly Trends (Line Chart)
- PESTLE Analysis (Doughnut Chart)
- Country Comparison (Bar Chart)

## Deployment

This project can be deployed on Vercel or any other platform that supports Next.js applications.

```bash
npm run build
npm start
```

## License

This project is licensed under the MIT License.ts data with interactive charts and filters.

## Features

- Interactive data visualizations using Chart.js
- Real-time filtering of data
- Responsive dashboard layout
- In-depth analytics page
- Detailed data filtering page with pagination
- Supabase database integration

## Tech Stack

- **Frontend**: Next.js 14 with App Router, Tailwind CSS, Chart.js
- **Backend**: Next.js API Routes
- **Database**: Supabase
- **Charts**: Chart.js with react-chartjs-2
- **UI Components**: Custom components with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Supabase account

### Setting Up Supabase

1. Create a new Supabase project
2. Create a table named `insights` with the following columns:
   - id (uuid, primary key)
   - end_year (text)
   - intensity (integer)
   - sector (text)
   - topic (text)
   - insight (text)
   - url (text)
   - region (text)
   - start_year (text)
   - impact (text)
   - added (text)
   - published (text)
   - country (text)
   - relevance (integer)
   - pestle (text)
   - source (text)
   - title (text)
   - likelihood (integer)

3. Get your Supabase URL and anon key from the project settings

### Project Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Import data to Supabase:
   ```bash
   npm run import-data
   ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
