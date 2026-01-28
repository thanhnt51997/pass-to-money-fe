import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { userApi } from './api';
import { UpdateProfileRequest } from './types';

const PROFILE_KEY = '/api/profile';
const HISTORY_KEY = '/api/interviews/history';

export function useProfile() {
    const { data, error, isLoading } = useSWR(PROFILE_KEY, () => userApi.getProfile());

    const updateProfile = async (data: UpdateProfileRequest) => {
        try {
            const updated = await userApi.updateProfile(data);
            mutate(PROFILE_KEY, updated, false);
            return updated;
        } catch (error) {
            throw error;
        }
    };

    return {
        profile: data,
        loading: isLoading,
        error,
        updateProfile
    };
}

export function useInterviewHistory(page = 1) {
    const { data, error, isLoading } = useSWR(
        [HISTORY_KEY, page],
        () => userApi.getHistory(page)
    );

    return {
        data,
        loading: isLoading,
        error
    };
}
