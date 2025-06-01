-- Create the insights table
-- This SQL can be run directly in the Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    end_year TEXT,
    intensity INTEGER NOT NULL DEFAULT 0,
    sector TEXT,
    topic TEXT,
    insight TEXT,
    url TEXT,
    region TEXT,
    start_year TEXT,
    impact TEXT,
    added TEXT,
    published TEXT,
    country TEXT,
    relevance INTEGER NOT NULL DEFAULT 0,
    pestle TEXT,
    source TEXT,
    title TEXT,
    likelihood INTEGER NOT NULL DEFAULT 0
);

-- Add indexes to improve query performance
CREATE INDEX IF NOT EXISTS idx_insights_topic ON public.insights (topic);
CREATE INDEX IF NOT EXISTS idx_insights_region ON public.insights (region);
CREATE INDEX IF NOT EXISTS idx_insights_sector ON public.insights (sector);
CREATE INDEX IF NOT EXISTS idx_insights_country ON public.insights (country);
CREATE INDEX IF NOT EXISTS idx_insights_pestle ON public.insights (pestle);
CREATE INDEX IF NOT EXISTS idx_insights_end_year ON public.insights (end_year);

-- Enable Row Level Security but allow public read access
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON public.insights
  FOR SELECT
  USING (true);

-- Commenting this policy out by default - uncomment if you want to allow public data insertion
/*
CREATE POLICY "Allow authenticated insert access"
  ON public.insights
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
*/
