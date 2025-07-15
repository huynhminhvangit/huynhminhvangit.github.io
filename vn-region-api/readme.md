# 🇻🇳 VN Region API

API miễn phí cung cấp danh sách đầy đủ 63 Tỉnh/Thành phố - Phường/Xã Việt Nam. Dữ liệu được cập nhật mới nhất sau đợt sáp nhập ngày 01/07/2025.

## � Live Demo

- **Trang chủ**: [https://huynhminhvangit.github.io/vn-region-api/](https://huynhminhvangit.github.io/vn-region-api/)
- **Demo & Test**: [https://huynhminhvangit.github.io/vn-region-api/demo.html](https://huynhminhvangit.github.io/vn-region-api/demo.html)

## 🔗 API Endpoints

### Direct JSON Data
- **Provinces**: [data/provinces.json](https://huynhminhvangit.github.io/vn-region-api/data/provinces.json)
- **Wards**: [data/wards.json](https://huynhminhvangit.github.io/vn-region-api/data/wards.json)

### API Endpoints (with query parameters)
- **Provinces by code**: `/api/provinces.html?code=01`
- **Provinces by name**: `/api/provinces.html?name=Hà Nội`
- **Wards by province code**: `/api/wards.html?province_code=01`
- **Wards by province name**: `/api/wards.html?province_name=Hà Nội`
- **Wards by district code**: `/api/wards.html?district_code=001`

## 📦 Cách sử dụng

### 1. Sử dụng trực tiếp (JSON Data)

```js
// Lấy tất cả tỉnh/thành
fetch("https://huynhminhvangit.github.io/vn-region-api/data/provinces.json")
  .then(res => res.json())
  .then(data => console.log(data));

// Lấy tất cả phường/xã  
fetch("https://huynhminhvangit.github.io/vn-region-api/data/wards.json")
  .then(res => res.json())
  .then(data => console.log(data));
```

### 2. Sử dụng API Helper (Khuyến nghị)

```html
<!-- Include the helper library -->
<script src="https://huynhminhvangit.github.io/vn-region-api/vn-region-api.js"></script>

<script>
// Initialize API client
const api = new VNRegionAPI();

// Get all provinces
const provinces = await api.getProvinces();

// Get province by code
const province = await api.getProvinceByCode('01');

// Search provinces by name
const result = await api.searchProvinces('Hà Nội');

// Get wards by province code
const wards = await api.getWardsByProvinceCode('01');

// Get wards by province name
const wards = await api.getWardsByProvinceName('Hà Nội');
</script>
```

### 3. Sử dụng API Endpoints

```js
// Tìm tỉnh theo mã code
fetch("https://huynhminhvangit.github.io/vn-region-api/api/provinces.html?code=01")
  .then(res => res.text())
  .then(html => {
    const match = html.match(/<pre>(.*?)<\/pre>/s);
    if (match) {
      const data = JSON.parse(match[1]);
      console.log(data);
    }
  });

// Tìm phường/xã theo tên tỉnh
fetch("https://huynhminhvangit.github.io/vn-region-api/api/wards.html?province_name=" + encodeURIComponent("Hà Nội"))
  .then(res => res.text())
  .then(html => {
    const match = html.match(/<pre>(.*?)<\/pre>/s);
    if (match) {
      const data = JSON.parse(match[1]);
      console.log(data);
    }
  });
```

## 📋 Cấu trúc dữ liệu

### Provinces (Tỉnh/Thành)
```json
{
  "code": "01",
  "name": "Thành phố Hà Nội", 
  "type": "Thành phố Trung ương"
}
```

### Wards (Phường/Xã)
```json
{
  "code": "00001",
  "name": "Phường Phúc Xá",
  "district_code": "001", 
  "province_code": "01"
}
```

## 🌟 Tính năng

- ✅ **Hoàn toàn miễn phí** - Không cần API key, không giới hạn request
- ✅ **Dữ liệu chính thức** - Cập nhật từ Tổng cục Thống kê Việt Nam  
- ✅ **Tốc độ cao** - Host trên GitHub Pages với CDN toàn cầu
- ✅ **CORS friendly** - Gọi trực tiếp từ frontend
- ✅ **RESTful API** - Query parameters support
- ✅ **JavaScript Helper** - Library hỗ trợ sẵn
- ✅ **Cập nhật thường xuyên** - Theo dõi thay đổi hành chính

## 🗂️ Cấu trúc dự án

```
├── index.html              <- Trang chủ và documentation
├── demo.html               <- Trang demo và test API  
├── vn-region-api.js        <- JavaScript helper library
├── data/
│   ├── provinces.json      <- Dữ liệu 63 tỉnh/thành
│   └── wards.json          <- Dữ liệu phường/xã (33 mẫu)
├── api/
│   ├── provinces.html      <- API endpoint for provinces
│   └── wards.html          <- API endpoint for wards
├── favicon/                <- Icons và manifest
└── README.md
```