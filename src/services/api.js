import axios from "axios";

// Automatically detects if running locally or deployed on Vercel
const API = axios.create({
baseURL: import.meta.env.DEV 
    ? "http://localhost:3000/api" 
    : "http://car-care-api.loca.lt/api",
    headers: {
    'bypass-tunnel-reminder': 'true',
  },
});

export default API;