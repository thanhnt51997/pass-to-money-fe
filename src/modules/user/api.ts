import http from '@/lib/http';
import { InterviewHistoryResponse, UpdateProfileRequest, UserProfile } from './types';

export const userApi = {
    getProfile: async (): Promise<UserProfile> => {
        const res = await http.get<{ success: boolean; data: UserProfile }>('/api/profile');
        return res.data.data;
    },

    updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
        const res = await http.put<{ success: boolean; data: UserProfile }>('/api/profile', data);
        return res.data.data;
    },

    getHistory: async (page = 1, limit = 10): Promise<InterviewHistoryResponse['data']> => {
        const res = await http.get<InterviewHistoryResponse>('/api/interviews/history', {
            params: { page, limit }
        });
        return res.data.data;
    }
};
