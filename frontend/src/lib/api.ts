// src/lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Interceptor: Kode ini akan berjalan sebelum setiap request dikirim
apiClient.interceptors.request.use(config => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
        // Jika ada token, tambahkan ke header Authorization
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


export default apiClient;