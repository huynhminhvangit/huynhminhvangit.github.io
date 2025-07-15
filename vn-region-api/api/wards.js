/**
 * API endpoint for wards data
 * Returns list of wards, optionally filtered by district_code, province_code, or province_name
 */

async function getWards(districtCode = null, provinceCode = null, provinceName = null) {
  try {
    const response = await fetch('../data/wards.json');
    const wards = await response.json();
    
    let filteredWards = wards;
    
    if (districtCode) {
      filteredWards = wards.filter(ward => ward.district_code === districtCode);
    } else if (provinceCode) {
      filteredWards = wards.filter(ward => ward.province_code === provinceCode);
    } else if (provinceName) {
      // First, get the province code by name
      const provincesResponse = await fetch('../data/provinces.json');
      const provinces = await provincesResponse.json();
      const searchName = provinceName.toLowerCase().trim();
      const matchedProvince = provinces.find(province => 
        province.name.toLowerCase().includes(searchName)
      );
      
      if (matchedProvince) {
        filteredWards = wards.filter(ward => ward.province_code === matchedProvince.code);
      } else {
        filteredWards = [];
      }
    }
    
    return filteredWards;
  } catch (error) {
    console.error('Error fetching wards:', error);
    return [];
  }
}

// For serverless deployment (Vercel, Netlify, etc.)
export default async function handler(req, res) {
  try {
    const { district_code, province_code, province_name } = req.query;
    const wards = await getWards(district_code, province_code, province_name);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json(wards);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch wards' });
  }
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getWards, handler };
}
