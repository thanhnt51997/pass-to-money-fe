import { create } from 'zustand';
import { User, AuthState } from './types';

/**
 * Global Auth Store
 * Business Rules:
 * - Managed global authentication state (UC-02, UC-21)
 * - Persists user profile and loading states
 */

interface AuthStore extends AuthState {
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start with loading to check initial session

    setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        isLoading: false
    }),

    setLoading: (isLoading) => set({ isLoading }),

    logout: () => set({
        user: null,
        isAuthenticated: false,
        isLoading: false
    }),
}));
