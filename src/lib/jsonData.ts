// Utility function to read and cache the JSON data file
import fs from 'fs';
import path from 'path';
import { Insight } from '@/types';

// Cache the data to avoid reading the file on every request
let cachedData: Insight[] | null = null;

export function getJsonData(): Insight[] {
  // Return cached data if available
  if (cachedData) {
    return cachedData;
  }

  try {
    // Try to read from the project directory first
    let filePath = path.join(process.cwd(), 'jsondata.json');
    
    if (!fs.existsSync(filePath)) {
      // Try the parent directory if not found
      filePath = path.join(process.cwd(), '..', 'jsondata.json');
      if (!fs.existsSync(filePath)) {
        throw new Error('jsondata.json not found in the project or parent directory');
      }
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents) as Insight[];
    
    // Add IDs to the data if they don't exist
    const dataWithIds = data.map((item, index) => ({
      ...item,
      id: item.id || `id-${index}`
    }));
    
    // Cache the data for future requests
    cachedData = dataWithIds;
    return dataWithIds;
  } catch (error) {
    console.error('Error reading JSON data:', error);
    return [];
  }
}
