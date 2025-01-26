import axios from "axios";

export const api = axios.create({
    // baseURL: 'http://localhost:5000/api'
    baseURL: 'https://group-study-review-server.onrender.com/api'
})