/**
 * API endpoint for provinces data
 * Returns list of all Vietnam provinces, optionally filtered by code or name
 */

async function getProvinces(code = null, name = null) {
  try {
    const response = await fetch('../data/provinces.json');
    const provinces = await response.json();
    
    let filteredProvinces = provinces;
    
    if (code) {
      filteredProvinces = provinces.filter(province => 
        province.code === code || province.code === code.toString()
      );
    } else if (name) {
      // Search by name (case-insensitive, partial match)
      const searchName = name.toLowerCase().trim();
      filteredProvinces = provinces.filter(province => 
        province.name.toLowerCase().includes(searchName)
      );
    }
    
    return filteredProvinces;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
}

// For serverless deployment (Vercel, Netlify, etc.)
export default async function handler(req, res) {
  try {
    const { code, name } = req.query;
    const provinces = await getProvinces(code, name);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json(provinces);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch provinces' });
  }
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getProvinces, handler };
}
