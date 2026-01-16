'use client';

import { useEffect } from 'react';
import { useFetchMe } from '@/modules/auth/hooks';

/**
 * UC-03: User Profile Management
 * Business Rules:
 * - Initialize user session on mount
 * - Populates global auth store
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { fetchMe } = useFetchMe();

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    return <>{children}</>;
}
