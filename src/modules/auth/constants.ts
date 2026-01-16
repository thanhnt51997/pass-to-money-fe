/**
 * Auth Constants
 */

export const AUTH_KEYS = {
    TOKEN: 'auth_token',
} as const;

export const ROLES = {
    USER: 'USER',
    MENTOR: 'MENTOR',
    ADMIN: 'ADMIN',
} as const;

export const API_ENDPOINTS = {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    REFRESH: '/api/auth/refresh',
} as const;
