# GitHub Copilot Instructions for `vn-region-api`

## 📌 Project Description

This project provides **free public access** to the list of Vietnam’s administrative units (provinces, districts, and wards), **updated after the July 1st, 2025 government reorganization**. The data is hosted as static JSON files on GitHub Pages and optionally served via serverless APIs.

---

## 📁 Folder Structure

- `data/`: Contains static `.json` datasets
  - `provinces.json` – list of provinces
  - `wards.json` – list of wards (linked to districts via `district_code`)
  
- `api/`: Optional JavaScript files to simulate or forward API responses (can use fetch and serve content)

---

## 💡 Copilot Guidance

- Prefer **clean, minimal, readable** code
- Avoid unnecessary dependencies
- Use native `fetch` for retrieving JSON
- When building APIs, assume query params like `?province_code=01`
- JSON structure must match this format:

```json
{
  "code": "001",
  "name": "Phường Ba Đình",
  "province_code": "01"
}
