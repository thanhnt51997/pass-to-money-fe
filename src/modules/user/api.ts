import http from '@/lib/http';
import {
    InterviewHistoryResponse,
    ProfileAnalytics,
    SkillBreakdown,
    UpdateGoalRequest,
    UpdateUserInfoRequest,
    UserProfile,
} from './types';

export const userApi = {
    getProfile: async (): Promise<UserProfile> => {
        const res = await http.get<{ success: boolean; data: UserProfile }>('/api/profile');
        return res.data.data;
    },

    /**
     * UC-21: Update Career Goals
     * Calls existing BE endpoint PATCH /api/profile/goal
     */
    updateGoal: async (data: UpdateGoalRequest): Promise<UserProfile> => {
        const res = await http.patch<{ success: boolean; data: UserProfile }>('/api/profile/goal', {
            target_level: data.target_level,
            preferred_stack: data.preferred_stack,
            secondary_stacks: data.secondary_stacks,
        });
        return res.data.data;
    },

    /**
     * UC-22: Update User Info
     * Calls new BE endpoint PATCH /api/user/profile
     * NOTE: Depends on BE Agent completing the new endpoint before this is live.
     */
    updateUserInfo: async (data: UpdateUserInfoRequest): Promise<UserProfile> => {
        const res = await http.patch<{ success: boolean; data: UserProfile }>('/api/user/profile', {
            name: data.name,
            bio: data.bio,
            linkedin_url: data.linkedin_url,
            github_url: data.github_url,
        });
        return res.data.data;
    },

    getHistory: async (page = 1, limit = 10): Promise<InterviewHistoryResponse['data']> => {
        const res = await http.get<InterviewHistoryResponse>('/api/profile/history', {
            params: { page, per_page: limit },
        });
        return res.data.data;
    },

    getAnalytics: async (): Promise<ProfileAnalytics> => {
        const res = await http.get<{ success: boolean; data: ProfileAnalytics }>('/api/profile/analytics');
        return res.data.data;
    },

    getSkillBreakdown: async (): Promise<SkillBreakdown[]> => {
        const res = await http.get<{ success: boolean; data: SkillBreakdown[] }>('/api/profile/skills');
        return res.data.data;
    },
};
