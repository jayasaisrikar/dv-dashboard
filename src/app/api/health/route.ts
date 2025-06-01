import { getJsonData } from "@/lib/jsonData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get data from the JSON file
    const data = getJsonData();
    
    if (!data || data.length === 0) {
      throw new Error('No data found in JSON file');
    }
    
    return NextResponse.json({ 
      status: 'ok',
      message: 'Local JSON data loaded successfully',
      recordCount: data.length,
      sampleRecord: data[0] || null
    });
    
  } catch (error) {
    console.error("API health check failed:", error);    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to load JSON data',
      error: String(error)
    }, { status: 500 });
  }
}
