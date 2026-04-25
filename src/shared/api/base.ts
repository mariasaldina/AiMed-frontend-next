import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const refreshApi = axios.create({
    ...api.defaults
})