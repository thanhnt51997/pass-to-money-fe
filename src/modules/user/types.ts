import { InterviewStatus, Level, Stack } from '@/modules/interview/types';
import { User } from '@/modules/auth/types';

export interface UserProfile extends User {
    target_level?: Level;
    preferred_stack?: Stack;
    secondary_stacks?: string[];
    bio?: string;
    avatar_url?: string;
    github_url?: string;
    linkedin_url?: string;
    created_at: string;
}

export interface UpdateGoalRequest {
    target_level?: string;
    preferred_stack?: string;
    secondary_stacks?: string[];
}

export interface UpdateUserInfoRequest {
    name?: string;
    bio?: string;
    linkedin_url?: string;
    github_url?: string;
}

export interface InterviewHistoryItem {
    id: string;
    template_name?: string;
    level: Level;
    stack: Stack;
    status: InterviewStatus;
    score: number | null;
    started_at: string;
    submitted_at: string | null;
}

export interface InterviewHistoryResponse {
    success: boolean;
    data: {
        items: InterviewHistoryItem[];
        meta: {
            total: number;
            page: number;
            last_page: number;
        };
    };
    message: string;
}

export interface ProfileAnalytics {
    total_interviews: number;
    avg_score: number;
    score_trend: Array<{ date: string; score: number }>;
    level_readiness: {
        is_ready: boolean;
        target_level: string | null;
        current_avg: number;
        required_avg: number;
    };
    stack_improvement: Array<{
        stack: string;
        first_score: number;
        latest_score: number;
        improvement: number;
    }>;
}

export interface SkillBreakdown {
    stack: string;
    interview_count: number;
    avg_score: number;
    last_interview_at: string;
}
