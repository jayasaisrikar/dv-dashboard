# Troubleshooting Guide

This guide helps you solve common issues you might encounter when setting up and running the Data Visualization Dashboard.

## Database Connection Issues

### Error: "Supabase connection failed"

**Possible causes and solutions:**

1. **Incorrect environment variables**
   - Check that your `.env.local` file exists and contains the correct Supabase URL and anon key
   - Verify the credentials by going to your Supabase dashboard > Settings > API

2. **The insights table doesn't exist**
   - Go to your Supabase dashboard > Table Editor
   - Check if the `insights` table exists with the correct schema
   - If not, follow the setup guide to create the table

3. **No data imported**
   - Run `npm run import-data` to import the data
   - Check if the `jsondata.json` file exists in the root of your project

4. **Supabase service is down**
   - Check the status of Supabase at https://status.supabase.com/
   - Try again later if there's a service outage

## Data Import Issues

### Error: "Error importing data"

**Possible causes and solutions:**

1. **Invalid JSON format**
   - Verify that your `jsondata.json` file is valid JSON
   - Use a JSON validator to check the format

2. **Missing required fields**
   - Check that your JSON data has all the required fields
   - Review the Insight interface in `src/types/index.ts`

3. **Permission issues**
   - Ensure your Supabase anon key has insert permissions for the `insights` table
   - Check the RLS (Row Level Security) settings in Supabase

## Chart Rendering Issues

### Charts not showing or showing incorrect data

**Possible causes and solutions:**

1. **No data matching filters**
   - Try resetting filters to see if data appears
   - Check if your database contains data that matches the filter criteria

2. **JavaScript errors**
   - Open your browser's developer console (F12) to check for errors
   - Look for any failed API requests or JS exceptions

3. **Chart.js version incompatibility**
   - Check that you're using the correct import from `chart.js` and `react-chartjs-2`
   - Verify that all chart configurations are compatible with your Chart.js version

## Next.js Development Issues

### Error: "Module not found"

**Possible causes and solutions:**

1. **Missing dependencies**
   - Run `npm install` to ensure all dependencies are installed
   - Check that the package mentioned in the error is in your `package.json`

2. **Incorrect imports**
   - Verify the import paths in your files
   - Check for typos in the import statements

3. **Case sensitivity issues**
   - Ensure the case of your file names matches the imports
   - Some operating systems are case-insensitive but Next.js is case-sensitive

## API Route Issues

### API returns 500 error

**Possible causes and solutions:**

1. **Supabase connection error**
   - Check your Supabase connection in `.env.local`
   - Verify you can connect to Supabase from the Setup page

2. **Invalid query parameters**
   - Check the parameters being passed to your API routes
   - Verify that they're in the expected format

3. **Server-side error**
   - Check the server logs in your terminal
   - Look for error messages that might explain the issue

## Still Having Problems?

If you're still experiencing issues after following this troubleshooting guide:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Check the [Supabase documentation](https://supabase.com/docs)
3. Check the [Chart.js documentation](https://www.chartjs.org/docs/latest/)
4. Try searching for your specific error message online
