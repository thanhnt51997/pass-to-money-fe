import axios from 'axios';
import Cookies from 'js-cookie';
import { AUTH_KEYS } from '@/modules/auth/constants';

/**
 * API Gateway (lib/http.ts)
 * Base configuration for axios
 */

const http = axios.create({
    baseURL: 'http://localhost:8003',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor for Bearer token
http.interceptors.request.use(
    (config) => {
        const token = Cookies.get(AUTH_KEYS.TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
http.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - Token Expired or Invalid
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Only attempt refresh if it's not the login or refresh endpoint itself
            if (!originalRequest.url?.includes('/api/auth/login') && !originalRequest.url?.includes('/api/auth/refresh')) {
                try {
                    const response = await axios.post('http://localhost:8003/api/auth/refresh', {}, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get(AUTH_KEYS.TOKEN)}`,
                        }
                    });

                    const { token } = response.data.data;
                    Cookies.set(AUTH_KEYS.TOKEN, token);

                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return http(originalRequest);
                } catch (refreshError) {
                    // If refresh fails, clear cookies and redirect to login
                    Cookies.remove(AUTH_KEYS.TOKEN);
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default http;
