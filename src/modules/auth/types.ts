/**
 * UC-01: User Registration
 * UC-02: Login / Logout
 * UC-03: User Profile Management
 * UC-21: User Role & Permission Enforcement
 */

export type UserRole = 'USER' | 'MENTOR' | 'ADMIN';

export type User = {
    id: number;
    email: string;
    name: string;
    role: UserRole;
};

export type BaseResponse<T> = {
    success: boolean;
    data: T;
    message: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
};

export type AuthResponseData = {
    token: string;
    user: User;
};

export type RefreshResponseData = {
    token: string;
};

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};
