# Supabase Setup Instructions

## Step 1: Create a Supabase Account
1. Sign up for a Supabase account at https://supabase.io/
2. Create a new project and note your project URL and API key

## Step 2: Configure Environment Variables
Create a .env.local file in the root directory with the following:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Step 3: Create a Table in Supabase

You can create the table in two ways:

### Option 1: Use the Table Editor UI
Create a `insights` table with the following columns:

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

### Option 2: Use the SQL Migration (Recommended)
1. Go to the SQL Editor in your Supabase dashboard
2. Open the file `supabase/migration.sql` from this project
3. Copy and paste the SQL into the editor
4. Run the SQL to create the table with proper indexes
- pestle (text)
- source (text)
- title (text)
- likelihood (integer)

## Step 4: Import Data
Run the import script:
```
npm run import-data
```
