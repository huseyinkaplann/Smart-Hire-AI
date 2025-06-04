import axios from "axios"

const BASE_URL = "http://localhost:8000";

const api = axios.create({
    baseURL: BASE_URL,
});

//Eğer token varsa header'a otomatik ekle

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer ${token}";
    }
    return config;
});

export default api