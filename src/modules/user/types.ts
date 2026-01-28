import { InterviewStatus, Level, Stack } from '@/modules/interview/types';
import { User } from '@/modules/auth/types';

export interface UserProfile extends User {
    target_level?: Level;
    preferred_stack?: Stack;
    bio?: string;
    avatar_url?: string;
    github_url?: string;
    linkedin_url?: string;
    created_at: string;
}

export interface UpdateProfileRequest {
    name?: string;
    target_level?: Level;
    preferred_stack?: Stack;
    bio?: string;
    github_url?: string;
    linkedin_url?: string;
}

export interface InterviewHistoryItem {
    id: string; // Session ID
    template_name?: string; // If template driven
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
