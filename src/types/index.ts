export interface Insight {
  id: string;
  end_year: string | null;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string | null;
  impact: string | null;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
  swot?: string; // Added swot property
  city?: string; // Added city property
}

export interface FilterOptions {
  endYear: string[];
  topics: string[];
  sectors: string[];
  regions: string[];
  pestle: string[];
  sources: string[];
  swot: string[];
  countries: string[];
  cities: string[];
}

export interface FilterState {
  endYear: string | null;
  topic: string | null;
  sector: string | null;
  region: string | null;
  pestle: string | null;
  source: string | null;
  swot: string | null;
  country: string | null;
  city: string | null;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}
