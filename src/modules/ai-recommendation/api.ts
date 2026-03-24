import http from '@/lib/http';
import type {
    AIReadiness,
    AIRecommendationSummary,
    AIRecommendedQuestion,
    AIRegenerateResponse,
    AIRoadmapPhase,
    AISkillGap,
} from './types';

export async function getAISummary(): Promise<AIRecommendationSummary> {
    const res = await http.get<{ success: boolean; data: AIRecommendationSummary }>('/api/ai/summary');
    return res.data.data;
}

export async function getAIRoadmap(): Promise<AIRoadmapPhase[]> {
    const res = await http.get<{ success: boolean; data: AIRoadmapPhase[] }>('/api/ai/roadmap');
    return res.data.data;
}

export async function getAISkillGaps(): Promise<AISkillGap[]> {
    const res = await http.get<{ success: boolean; data: AISkillGap[] }>('/api/ai/skill-gaps');
    return res.data.data;
}

export async function getAIReadiness(): Promise<AIReadiness> {
    const res = await http.get<{ success: boolean; data: AIReadiness }>('/api/ai/readiness');
    return res.data.data;
}

export async function getAIRecommendedQuestions(): Promise<AIRecommendedQuestion[]> {
    const res = await http.get<{ success: boolean; data: AIRecommendedQuestion[] }>('/api/ai/recommended-questions');
    return res.data.data;
}

export async function postAIRegenerate(): Promise<AIRegenerateResponse> {
    const res = await http.post<{ success: boolean; data: AIRegenerateResponse }>('/api/ai/regenerate');
    return res.data.data;
}
