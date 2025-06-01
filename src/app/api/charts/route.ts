import { getJsonData } from "@/lib/jsonData";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Apply any filters same as in insights endpoint
    const endYear = searchParams.get('endYear');
    const topic = searchParams.get('topic');
    const sector = searchParams.get('sector');
    const region = searchParams.get('region');
    const pestle = searchParams.get('pestle');
    const source = searchParams.get('source');
    const swot = searchParams.get('swot');
    const country = searchParams.get('country');
    
    // Get type of chart requested
    const chartType = searchParams.get('chartType') || 'intensityByRegion';
    
    // Get data from JSON file
    const allData = getJsonData();
    
    // Apply filters
    const filteredData = allData.filter(item => {
      if (endYear && item.end_year !== endYear) return false;
      if (topic && !item.topic?.toLowerCase().includes(topic.toLowerCase())) return false;
      if (sector && !item.sector?.toLowerCase().includes(sector.toLowerCase())) return false;
      if (region && !item.region?.toLowerCase().includes(region.toLowerCase())) return false;
      if (pestle && !item.pestle?.toLowerCase().includes(pestle.toLowerCase())) return false;
      if (source && !item.source?.toLowerCase().includes(source.toLowerCase())) return false;
      if (swot && !item.swot?.toLowerCase().includes(swot.toLowerCase())) return false;
      if (country && !item.country?.toLowerCase().includes(country.toLowerCase())) return false;
      return true;
    });
    
    // Prepare response based on chart type
    let chartData;
    
    switch(chartType) {
      case 'intensityByRegion':
        chartData = getIntensityByRegion(filteredData);
        break;
      case 'likelihoodByRegion':
        chartData = getLikelihoodByRegion(filteredData);
        break;
      case 'relevanceByRegion':
        chartData = getRelevanceByRegion(filteredData);
        break;
      case 'topicDistribution':
        chartData = getTopicDistribution(filteredData);
        break;
      case 'intensityBySector':
        chartData = getIntensityBySector(filteredData);
        break;
      case 'yearlyTrends':
        chartData = getYearlyTrends(filteredData);
        break;
      case 'countryComparison':
        chartData = getCountryComparison(filteredData);
        break;
      case 'pestleAnalysis':
        chartData = getPestleAnalysis(filteredData);
        break;
      default:
        chartData = getIntensityByRegion(filteredData);
    }
    
    return NextResponse.json(chartData);
    
  } catch (error) {
    console.error("Error generating chart data:", error);
    return NextResponse.json({ error: "Failed to generate chart data" }, { status: 500 });
  }
}

// Helper functions to aggregate data for different chart types

function getIntensityByRegion(data: any[]) {
  const regionMap: Record<string, number> = {};
  
  // Group and sum intensity by region
  data.forEach(item => {
    if (item.region) {
      if (!regionMap[item.region]) {
        regionMap[item.region] = 0;
      }
      regionMap[item.region] += item.intensity || 0;
    }
  });
  
  // Convert to arrays for chart.js
  const regions = Object.keys(regionMap);
  const intensities = regions.map(region => regionMap[region]);
  
  return {
    labels: regions,
    datasets: [
      {
        label: 'Intensity by Region',
        data: intensities,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };
}

function getLikelihoodByRegion(data: any[]) {
  const regionMap: Record<string, number> = {};
  const regionCount: Record<string, number> = {};
  
  // Sum likelihood and count items by region for averaging
  data.forEach(item => {
    if (item.region && item.likelihood) {
      if (!regionMap[item.region]) {
        regionMap[item.region] = 0;
        regionCount[item.region] = 0;
      }
      regionMap[item.region] += item.likelihood || 0;
      regionCount[item.region]++;
    }
  });
  
  // Calculate averages
  const regions = Object.keys(regionMap);
  const likelihoods = regions.map(region => 
    regionMap[region] / (regionCount[region] || 1)
  );
  
  return {
    labels: regions,
    datasets: [
      {
        label: 'Average Likelihood by Region',
        data: likelihoods,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };
}

function getRelevanceByRegion(data: any[]) {
  const regionMap: Record<string, number> = {};
  const regionCount: Record<string, number> = {};
  
  // Sum relevance and count items by region for averaging
  data.forEach(item => {
    if (item.region && item.relevance) {
      if (!regionMap[item.region]) {
        regionMap[item.region] = 0;
        regionCount[item.region] = 0;
      }
      regionMap[item.region] += item.relevance || 0;
      regionCount[item.region]++;
    }
  });
  
  // Calculate averages
  const regions = Object.keys(regionMap);
  const relevanceValues = regions.map(region => 
    regionMap[region] / (regionCount[region] || 1)
  );
  
  return {
    labels: regions,
    datasets: [
      {
        label: 'Average Relevance by Region',
        data: relevanceValues,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
    ]
  };
}

function getTopicDistribution(data: any[]) {
  const topicMap: Record<string, number> = {};
  
  // Count occurrences of each topic
  data.forEach(item => {
    if (item.topic) {
      if (!topicMap[item.topic]) {
        topicMap[item.topic] = 0;
      }
      topicMap[item.topic]++;
    }
  });
  
  // Sort topics by count and take top 10
  const topTopics = Object.entries(topicMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  const topics = topTopics.map(([topic]) => topic);
  const counts = topTopics.map(([, count]) => count);
  
  // Generate different colors for each topic
  const backgroundColors = topics.map((_, i) => {
    const hue = (i * 30) % 360;
    return `hsla(${hue}, 70%, 60%, 0.7)`;
  });
  
  return {
    labels: topics,
    datasets: [
      {
        label: 'Topic Distribution',
        data: counts,
        backgroundColor: backgroundColors,
        borderWidth: 1
      }
    ]
  };
}

function getIntensityBySector(data: any[]) {
  const sectorMap: Record<string, number> = {};
  const sectorCount: Record<string, number> = {};
  
  // Sum intensity and count items by sector for averaging
  data.forEach(item => {
    if (item.sector) {
      if (!sectorMap[item.sector]) {
        sectorMap[item.sector] = 0;
        sectorCount[item.sector] = 0;
      }
      sectorMap[item.sector] += item.intensity || 0;
      sectorCount[item.sector]++;
    }
  });
  
  // Calculate averages and convert to arrays
  const sectors = Object.keys(sectorMap);
  const intensities = sectors.map(sector => 
    sectorMap[sector] / (sectorCount[sector] || 1)
  );
  
  return {
    labels: sectors,
    datasets: [
      {
        label: 'Average Intensity by Sector',
        data: intensities,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };
}

function getYearlyTrends(data: any[]) {
  const yearMap: Record<string, number> = {};
  const yearCount: Record<string, number> = {};
  
  // Extract years from published dates and sum intensities
  data.forEach(item => {
    if (item.published) {
      const year = item.published.split(', ')[1]?.split(' ')[0];
      if (year && !isNaN(parseInt(year))) {
        if (!yearMap[year]) {
          yearMap[year] = 0;
          yearCount[year] = 0;
        }
        yearMap[year] += item.intensity || 0;
        yearCount[year]++;
      }
    }
  });
  
  // Sort years and calculate average intensities
  const years = Object.keys(yearMap).sort();
  const avgIntensities = years.map(year => 
    yearMap[year] / (yearCount[year] || 1)
  );
  
  return {
    labels: years,
    datasets: [
      {
        label: 'Average Intensity Yearly Trend',
        data: avgIntensities,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        fill: false
      }
    ]
  };
}

function getCountryComparison(data: any[]) {
  const countryMap: Record<string, number> = {};
  
  // Count occurrences of each country
  data.forEach(item => {
    if (item.country) {
      if (!countryMap[item.country]) {
        countryMap[item.country] = 0;
      }
      countryMap[item.country]++;
    }
  });
  
  // Sort countries by count and take top 10
  const topCountries = Object.entries(countryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  const countries = topCountries.map(([country]) => country);
  const counts = topCountries.map(([, count]) => count);
  
  return {
    labels: countries,
    datasets: [
      {
        label: 'Insights by Country',
        data: counts,
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  };
}

function getPestleAnalysis(data: any[]) {
  const pestleMap: Record<string, number> = {};
  
  // Count occurrences of each PESTLE category
  data.forEach(item => {
    if (item.pestle) {
      if (!pestleMap[item.pestle]) {
        pestleMap[item.pestle] = 0;
      }
      pestleMap[item.pestle]++;
    }
  });
  
  // Convert to arrays for chart.js
  const pestleCategories = Object.keys(pestleMap);
  const counts = pestleCategories.map(category => pestleMap[category]);
  
  // Generate different colors for each category
  const backgroundColors = pestleCategories.map((_, i) => {
    const hue = (i * 45) % 360;
    return `hsla(${hue}, 80%, 60%, 0.7)`;
  });
  
  return {
    labels: pestleCategories,
    datasets: [
      {
        label: 'PESTLE Analysis',
        data: counts,
        backgroundColor: backgroundColors,
        borderWidth: 1
      }
    ]
  };
}
