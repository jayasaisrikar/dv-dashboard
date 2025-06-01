import { getJsonData } from "@/lib/jsonData";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Handle filters
    const endYear = searchParams.get('endYear');
    const topic = searchParams.get('topic');
    const sector = searchParams.get('sector');
    const region = searchParams.get('region');
    const pestle = searchParams.get('pestle');
    const source = searchParams.get('source');
    const swot = searchParams.get('swot');
    const country = searchParams.get('country');
    const city = searchParams.get('city');
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const start = (page - 1) * limit;
    const end = start + limit;
    
    // Get data from JSON file
    const allData = getJsonData();
    
    // Apply filters
    let filteredData = allData.filter(item => {
      if (endYear && item.end_year !== endYear) return false;
      if (topic && !item.topic?.toLowerCase().includes(topic.toLowerCase())) return false;
      if (sector && !item.sector?.toLowerCase().includes(sector.toLowerCase())) return false;
      if (region && !item.region?.toLowerCase().includes(region.toLowerCase())) return false;
      if (pestle && !item.pestle?.toLowerCase().includes(pestle.toLowerCase())) return false;
      if (source && !item.source?.toLowerCase().includes(source.toLowerCase())) return false;
      if (swot && !item.swot?.toLowerCase().includes(swot.toLowerCase())) return false;
      if (country && !item.country?.toLowerCase().includes(country.toLowerCase())) return false;
      if (city && !item.city?.toLowerCase().includes(city.toLowerCase())) return false;
      return true;
    });
    
    // Get total count
    const total = filteredData.length;
    
    // Apply pagination
    const paginatedData = filteredData.slice(start, end);
    
    return NextResponse.json({ 
      data: paginatedData,
      total,
      page,
      limit
    });
    
  } catch (error) {
    console.error("Error fetching insights:", error);
    return NextResponse.json({ error: "Failed to fetch insights" }, { status: 500 });
  }
}
