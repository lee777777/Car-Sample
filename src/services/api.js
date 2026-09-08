import axios from "axios";

// Automatically detects if running locally or deployed on Vercel
const API = axios.create({
baseURL: import.meta.env.DEV 
    ? "http://localhost:3000/api" 
    : "https://soft-cow-81.loca.lt/api",
    headers: {
    'bypass-tunnel-reminder': 'true',
  },
});

export default API;