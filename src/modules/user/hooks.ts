import useSWR, { mutate } from 'swr';
import { userApi } from './api';
import { ProfileAnalytics, SkillBreakdown, UpdateGoalRequest, UpdateUserInfoRequest } from './types';

const PROFILE_KEY = '/api/profile';
const HISTORY_KEY = '/api/profile/history';
const ANALYTICS_KEY = '/api/profile/analytics';
const SKILLS_KEY = '/api/profile/skills';

export function useProfile() {
    const { data, error, isLoading } = useSWR(PROFILE_KEY, () => userApi.getProfile());

    const updateGoal = async (data: UpdateGoalRequest) => {
        const updated = await userApi.updateGoal(data);
        mutate(PROFILE_KEY, updated, false);
        return updated;
    };

    const updateUserInfo = async (data: UpdateUserInfoRequest) => {
        const updated = await userApi.updateUserInfo(data);
        mutate(PROFILE_KEY, updated, false);
        return updated;
    };

    return {
        profile: data,
        loading: isLoading,
        error,
        updateGoal,
        updateUserInfo,
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
        error,
    };
}

/**
 * UC-20: Dashboard Analytics
 * Business Rules:
 * - Fetches aggregate stats for the dashboard overview
 */
export function useProfileAnalytics() {
    const { data, error, isLoading } = useSWR<ProfileAnalytics>(
        ANALYTICS_KEY,
        () => userApi.getAnalytics()
    );

    return {
        data,
        loading: isLoading,
        error,
    };
}

/**
 * UC-23: Profile Skill Breakdown
 * Business Rules:
 * - Read-only view of per-stack interview performance
 */
export function useSkillBreakdown() {
    const { data, isLoading } = useSWR<SkillBreakdown[]>(
        SKILLS_KEY,
        () => userApi.getSkillBreakdown()
    );

    return {
        data: data ?? [],
        loading: isLoading,
    };
}
