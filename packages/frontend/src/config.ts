export const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:8080";
export const apiUrl = new URL("/api", appUrl).toString();
