// API Configuration
const rawApiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Ensure the URL doesn't end with a slash to prevent double slashes
export const API_BASE_URL = rawApiUrl.endsWith("/")
  ? rawApiUrl.slice(0, -1)
  : rawApiUrl;

// Environment check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
