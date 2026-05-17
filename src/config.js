// src/config.js
export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:10000"
    : "https://eshopnew-server-4.onrender.com";
