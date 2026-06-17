import axios from "axios";

// Automatically detects if running locally or deployed on Vercel
const API = axios.create({
baseURL: import.meta.env.DEV 
    ? "http://localhost:3000/api" 
    : "https://car-care-backend-sage.vercel.app/api",
});

export default API;