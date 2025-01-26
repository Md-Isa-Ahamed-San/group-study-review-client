import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
    // baseURL: 'https://group-study-review-server.onrender.com/api'
})