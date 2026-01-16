import { useCallback } from 'react';
import { authApi } from './api';
import { useAuthStore } from './auth.store';
import { LoginRequest, RegisterRequest } from './types';
import { ROLES, AUTH_KEYS } from './constants';
import Cookies from 'js-cookie';

/**
 * UC-01: User Registration Flow
 * Business Rules:
 * - Orchestrates registration API and store updates
 */
export const useRegister = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const setLoading = useAuthStore((state) => state.setLoading);

    const register = async (data: RegisterRequest) => {
        setLoading(true);
        try {
            const response = await authApi.register(data);
            const { token, user } = response.data;
            Cookies.set(AUTH_KEYS.TOKEN, token);
            setUser(user);
            return response;
        } catch (error) {
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { register };
};

/**
 * UC-02: Login Flow
 * Business Rules:
 * - Orchestrates login API and store updates
 * - Handles loading state during login
 */
export const useLogin = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const setLoading = useAuthStore((state) => state.setLoading);

    const login = async (credentials: LoginRequest) => {
        setLoading(true);
        try {
            const response = await authApi.login(credentials);
            const { token, user } = response.data;
            Cookies.set(AUTH_KEYS.TOKEN, token);
            setUser(user);
            return response;
        } catch (error) {
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { login };
};

/**
 * UC-02: Logout Flow
 * Business Rules:
 * - Orchestrates logout API call
 * - Cleans up global store state
 */
export const useLogout = () => {
    const clearAuth = useAuthStore((state) => state.logout);

    const logout = async () => {
        try {
            await authApi.logout();
        } finally {
            Cookies.remove(AUTH_KEYS.TOKEN);
            clearAuth();
        }
    };

    return { logout };
};

/**
 * UC-03: Fetch Current User
 * Business Rules:
 * - Loads user profile from /me endpoint
 * - Populates auth store with user details
 */
export const useFetchMe = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const setLoading = useAuthStore((state) => state.setLoading);

    const fetchMe = useCallback(async () => {
        const token = Cookies.get(AUTH_KEYS.TOKEN);
        if (!token) {
            setLoading(false);
            setUser(null);
            return;
        }

        setLoading(true);
        try {
            const response = await authApi.getMe();
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [setUser, setLoading]);

    return { fetchMe };
};

/**
 * UC-21: User Role & Permission Check
 * Business Rules:
 * - Provides helpers for role verification (isAdmin, isMentor, isUser)
 * - Exposes reactive auth state
 */
export const useAuth = () => {
    const { user, isAuthenticated, isLoading } = useAuthStore();

    const isAdmin = user?.role === ROLES.ADMIN;
    const isMentor = user?.role === ROLES.MENTOR;
    const isUser = user?.role === ROLES.USER;

    const hasRole = (role: string) => user?.role === role;

    return {
        user,
        isAuthenticated,
        isLoading,
        isAdmin,
        isMentor,
        isUser,
        hasRole,
    };
};
