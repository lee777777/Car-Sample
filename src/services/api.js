import axios from "axios";

// Automatically detects if running locally or deployed on Vercel
const API = axios.create({
baseURL: import.meta.env.DEV 
    ? "http://localhost:3000/api" 
    : import.meta.env.VITE_API_BASE_URL,
    headers: {
    'bypass-tunnel-reminder': 'true',
  },
});

export default API;