require('dotenv').config({ path: './.env.local' });
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and key are required. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importData() {  try {
    // Try to read the JSON data file from the project root
    let dataPath = path.join(__dirname, '..', 'jsondata.json');
    
    // If file doesn't exist in the project root, try the parent directory
    if (!fs.existsSync(dataPath)) {
      console.log('jsondata.json not found in project root, checking parent directory...');
      dataPath = path.join(__dirname, '..', '..', 'jsondata.json');
      
      if (!fs.existsSync(dataPath)) {
        console.error('jsondata.json not found in project root or parent directory.');
        console.error('Please make sure the file exists in either:');
        console.error(`- ${path.join(__dirname, '..', 'jsondata.json')}`);
        console.error(`- ${path.join(__dirname, '..', '..', 'jsondata.json')}`);
        process.exit(1);
      }
    }
    
    console.log(`Reading data from: ${dataPath}`);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`Importing ${data.length} records to Supabase...`);
    
    // Split data into chunks to avoid request size limits
    const chunkSize = 1000;
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      
      // Add UUID for each record
      const recordsWithId = chunk.map(record => ({
        ...record,
        id: crypto.randomUUID()
      }));
      
      // Insert data into Supabase
      const { data: insertedData, error } = await supabase
        .from('insights')
        .insert(recordsWithId);
        
      if (error) {
        console.error(`Error inserting records ${i} to ${i + chunk.length}:`, error);
      } else {
        console.log(`Inserted records ${i} to ${i + chunk.length - 1} successfully.`);
      }
    }
    
    console.log('Data import completed!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
