/**
 * VN Region API Helper
 * A simple JavaScript library to interact with VN Region API
 * 
 * Usage:
 * const api = new VNRegionAPI('https://huynhminhvangit.github.io/vn-region-api');
 * 
 * // Get all provinces
 * const provinces = await api.getProvinces();
 * 
 * // Get province by code
 * const province = await api.getProvinceByCode('01');
 * 
 * // Search provinces by name
 * const provinces = await api.searchProvinces('Hà Nội');
 * 
 * // Get wards by province code
 * const wards = await api.getWardsByProvinceCode('01');
 * 
 * // Get wards by province name
 * const wards = await api.getWardsByProvinceName('Hà Nội');
 */

class VNRegionAPI {
    constructor(baseUrl = 'https://huynhminhvangit.github.io/vn-region-api') {
        this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    }
    
    /**
     * Parse HTML response to extract JSON data
     */
    parseHTMLResponse(html) {
        const preMatch = html.match(/<pre>(.*?)<\/pre>/s);
        if (preMatch) {
            try {
                return JSON.parse(preMatch[1]);
            } catch (error) {
                throw new Error('Failed to parse JSON from HTML response');
            }
        }
        throw new Error('No JSON data found in HTML response');
    }
    
    /**
     * Get all provinces
     */
    async getProvinces() {
        try {
            const response = await fetch(`${this.baseUrl}/data/provinces.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Failed to fetch provinces: ${error.message}`);
        }
    }
    
    /**
     * Get province by code
     */
    async getProvinceByCode(code) {
        try {
            const response = await fetch(`${this.baseUrl}/api/provinces.html?code=${code}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const data = this.parseHTMLResponse(html);
            return data.length > 0 ? data[0] : null;
        } catch (error) {
            // Fallback to direct data access
            const provinces = await this.getProvinces();
            return provinces.find(p => p.code === code) || null;
        }
    }
    
    /**
     * Search provinces by name (partial match, case-insensitive)
     */
    async searchProvinces(name) {
        try {
            const response = await fetch(`${this.baseUrl}/api/provinces.html?name=${encodeURIComponent(name)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            return this.parseHTMLResponse(html);
        } catch (error) {
            // Fallback to direct data access
            const provinces = await this.getProvinces();
            const searchName = name.toLowerCase().trim();
            return provinces.filter(p => p.name.toLowerCase().includes(searchName));
        }
    }
    
    /**
     * Get all wards
     */
    async getWards() {
        try {
            const response = await fetch(`${this.baseUrl}/data/wards.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Failed to fetch wards: ${error.message}`);
        }
    }
    
    /**
     * Get wards by district code
     */
    async getWardsByDistrictCode(districtCode) {
        try {
            const response = await fetch(`${this.baseUrl}/api/wards.html?district_code=${districtCode}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            return this.parseHTMLResponse(html);
        } catch (error) {
            // Fallback to direct data access
            const wards = await this.getWards();
            return wards.filter(w => w.district_code === districtCode);
        }
    }
    
    /**
     * Get wards by province code
     */
    async getWardsByProvinceCode(provinceCode) {
        try {
            const response = await fetch(`${this.baseUrl}/api/wards.html?province_code=${provinceCode}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            return this.parseHTMLResponse(html);
        } catch (error) {
            // Fallback to direct data access
            const wards = await this.getWards();
            return wards.filter(w => w.province_code === provinceCode);
        }
    }
    
    /**
     * Get wards by province name
     */
    async getWardsByProvinceName(provinceName) {
        try {
            const response = await fetch(`${this.baseUrl}/api/wards.html?province_name=${encodeURIComponent(provinceName)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            return this.parseHTMLResponse(html);
        } catch (error) {
            // Fallback method
            const provinces = await this.searchProvinces(provinceName);
            if (provinces.length === 0) {
                throw new Error(`Province not found: ${provinceName}`);
            }
            return await this.getWardsByProvinceCode(provinces[0].code);
        }
    }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VNRegionAPI;
} else if (typeof window !== 'undefined') {
    window.VNRegionAPI = VNRegionAPI;
}
