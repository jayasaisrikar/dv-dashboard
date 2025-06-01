# Supabase Setup Guide with Screenshots

## 1. Create a Supabase Account

1. Go to [Supabase](https://supabase.com/) and sign up for an account if you don't already have one.

2. Once logged in, you'll see the dashboard. Click on "New Project".

## 2. Create a New Project

1. Select your organization (or create a new one).

2. Give your project a name like "data-visualization-dashboard".

3. Set a secure database password (make sure to remember this).

4. Choose the region closest to you.

5. Keep the free tier (Hobby) selected.

6. Click "Create new project".

## 3. Create the "insights" Table

You have two options for creating the table:

### Option 1: Using the Table Editor UI

1. Once your project is created, navigate to the "Table Editor" from the left sidebar.

2. Click on "Create a new table".

3. Set the table name to `insights`.

4. Add the following columns:

| Name        | Type    | Default Value | Is Primary Key | Is Nullable |
|-------------|---------|---------------|----------------|-------------|
| id          | uuid    | uuid_generate_v4() | Yes (check this) | No          |
| end_year    | text    | NULL          | No             | Yes         |
| intensity   | integer | NULL          | No             | No          |
| sector      | text    | NULL          | No             | Yes         |
| topic       | text    | NULL          | No             | Yes         |
| insight     | text    | NULL          | No             | Yes         |
| url         | text    | NULL          | No             | Yes         |
| region      | text    | NULL          | No             | Yes         |
| start_year  | text    | NULL          | No             | Yes         |
| impact      | text    | NULL          | No             | Yes         |
| added       | text    | NULL          | No             | Yes         |
| published   | text    | NULL          | No             | Yes         |
| country     | text    | NULL          | No             | Yes         |
| relevance   | integer | NULL          | No             | No          |
| pestle      | text    | NULL          | No             | Yes         |
| source      | text    | NULL          | No             | Yes         |
| title       | text    | NULL          | No             | Yes         |
| likelihood  | integer | NULL          | No             | No          |

5. Click "Save" to create the table.

### Option 2: Using the SQL Editor (Recommended)

1. Navigate to the "SQL Editor" from the left sidebar.

2. Copy the contents of the provided `supabase/migration.sql` file in this project.

3. Paste the SQL into the editor and click "Run".

4. This will create the table with proper indexes for better performance.

## 4. Get Your API Credentials

1. In the left sidebar, go to "Project Settings".

2. Click on "API" in the settings menu.

3. You'll see your "Project URL" and API keys.

4. Copy the "Project URL" and "anon public" key.

## 5. Configure Your Environment Variables

1. Create a `.env.local` file in the root of your project (or edit the existing one).

2. Add the following, replacing the placeholder values with your actual Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 6. Import the Data

1. Make sure the `jsondata.json` file is in the root directory of your project.

2. Run the following command in your terminal:

```bash
npm run import-data
```

3. Wait for the import to complete. You should see success messages for each batch of records.

## 7. Verify Data Import

1. Go back to the Supabase dashboard.

2. Navigate to the "Table Editor" again.

3. Click on the "insights" table.

4. You should see your data has been imported successfully, with thousands of records available.

## 8. Run Your Application

After successful data import, you can run your application:

```bash
npm run dev
```

Your data visualization dashboard should now be connected to your Supabase database and showing visualizations of the imported data.
