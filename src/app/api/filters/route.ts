import { getJsonData } from "@/lib/jsonData";
import { NextResponse } from "next/server";

export async function GET() {  try {
    // Get all data from JSON file
    const data = getJsonData();
    
    // Extract unique values for each filter
    const endYears = [...new Set(data.map(item => item.end_year).filter(Boolean))].sort();
    const topics = [...new Set(data.map(item => item.topic).filter(Boolean))];
    const sectors = [...new Set(data.map(item => item.sector).filter(Boolean))];
    const regions = [...new Set(data.map(item => item.region).filter(Boolean))];
    const pestles = [...new Set(data.map(item => item.pestle).filter(Boolean))];
    const sources = [...new Set(data.map(item => item.source).filter(Boolean))];
    const countries = [...new Set(data.map(item => item.country).filter(Boolean))];
    
    // SWOT is not directly in the data, might need custom mapping
    const swot = ['Strength', 'Weakness', 'Opportunity', 'Threat'];
    
    // Cities are not in the example data structure provided in jsondata.json
    const cities: string[] = [];
    
    return NextResponse.json({
      endYears,
      topics,
      sectors,
      regions,
      pestles,
      sources,
      swot,
      countries,
      cities
    });
    
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return NextResponse.json({ error: "Failed to fetch filter options" }, { status: 500 });
  }
}
