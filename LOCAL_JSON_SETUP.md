# Moving from Supabase to Local JSON

This document explains the transition from using Supabase to using local JSON data in the dashboard.

## Why The Change?

We've simplified the application's setup process by removing the dependency on Supabase. Instead of requiring users to:

1. Create a Supabase account
2. Set up a database
3. Import data
4. Configure environment variables

The application now reads directly from the `jsondata.json` file included in the project.

## How It Works

1. The `src/lib/jsonData.ts` utility reads and caches the JSON data
2. API routes (`/api/insights`, `/api/filters`, `/api/charts`) use this utility instead of connecting to Supabase
3. The frontend components remain unchanged as they still fetch data from the same API endpoints

## Benefits

- **Simplified setup**: No need for external services or databases
- **Faster startup**: No waiting for data import processes
- **Offline usage**: The dashboard works entirely offline
- **No environment variables**: No need to manage sensitive credentials

## What If I Still Want to Use Supabase?

If you prefer using Supabase (which can be beneficial for production environments with multiple users), you can:

1. Follow the original setup instructions in `SUPABASE_SETUP.md`
2. Update the `.env.local` file with your Supabase credentials
3. Modify the API routes to use the Supabase client instead of the JSON utility
4. Run the data import script with `npm run import-data`

## Technical Implementation Details

The key changes made:

1. Added `src/lib/jsonData.ts` to read and cache the JSON file
2. Updated API routes to use this utility
3. Created `DataStatusPanel` component for the setup page
4. Modified environment variables to indicate Supabase is no longer required
