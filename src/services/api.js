import axios from "axios";

// Automatically detects if running locally or deployed on Vercel
const API = axios.create({
baseURL: import.meta.env.DEV 
    ? "http://localhost:3000/api" 
    : "https://api-carecare.duckdns.org/api",
});

export default API;