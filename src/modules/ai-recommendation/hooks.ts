import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import {
    getAIReadiness,
    getAIRecommendedQuestions,
    getAIRoadmap,
    getAISkillGaps,
    getAISummary,
    postAIRegenerate,
} from './api';
import type { AIReadiness, AIRecommendationSummary, AIRecommendedQuestion, AIRoadmapPhase, AISkillGap } from './types';

const AI_SUMMARY_KEY = '/api/ai/summary';
const AI_ROADMAP_KEY = '/api/ai/roadmap';
const AI_SKILL_GAPS_KEY = '/api/ai/skill-gaps';
const AI_READINESS_KEY = '/api/ai/readiness';
const AI_QUESTIONS_KEY = '/api/ai/recommended-questions';

/**
 * UC-AI-01: View AI Recommendation Dashboard
 * Business Rules:
 * - Fetch all recommendation data on mount
 * - Handle 404 gracefully (show "No recommendation yet, generate one" state)
 * - Regenerate triggers background job (async), show pending state
 */
export function useAIRecommendation() {
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [regenerateMessage, setRegenerateMessage] = useState<string | null>(null);

    const {
        data: summary,
        error: summaryError,
        isLoading: summaryLoading,
    } = useSWR<AIRecommendationSummary>(AI_SUMMARY_KEY, getAISummary, {
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
            if (error?.response?.status === 404) return;
            if (retryCount >= 3) return;
            setTimeout(() => revalidate({ retryCount }), 5000);
        },
    });

    const {
        data: roadmap,
        error: roadmapError,
        isLoading: roadmapLoading,
    } = useSWR<AIRoadmapPhase[]>(AI_ROADMAP_KEY, getAIRoadmap, {
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
            if (error?.response?.status === 404) return;
            if (retryCount >= 3) return;
            setTimeout(() => revalidate({ retryCount }), 5000);
        },
    });

    const {
        data: skillGaps,
        error: skillGapsError,
        isLoading: skillGapsLoading,
    } = useSWR<AISkillGap[]>(AI_SKILL_GAPS_KEY, getAISkillGaps, {
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
            if (error?.response?.status === 404) return;
            if (retryCount >= 3) return;
            setTimeout(() => revalidate({ retryCount }), 5000);
        },
    });

    const {
        data: readiness,
        error: readinessError,
        isLoading: readinessLoading,
    } = useSWR<AIReadiness>(AI_READINESS_KEY, getAIReadiness, {
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
            if (error?.response?.status === 404) return;
            if (retryCount >= 3) return;
            setTimeout(() => revalidate({ retryCount }), 5000);
        },
    });

    const {
        data: questions,
        error: questionsError,
        isLoading: questionsLoading,
    } = useSWR<AIRecommendedQuestion[]>(AI_QUESTIONS_KEY, getAIRecommendedQuestions, {
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
            if (error?.response?.status === 404) return;
            if (retryCount >= 3) return;
            setTimeout(() => revalidate({ retryCount }), 5000);
        },
    });

    const hasNoData =
        summaryError?.response?.status === 404 ||
        (summaryError && !summary);

    const regenerate = async () => {
        setIsRegenerating(true);
        setRegenerateMessage(null);
        try {
            const result = await postAIRegenerate();
            setRegenerateMessage(result.message);
            // Invalidate all caches so next revalidation picks up fresh data
            await Promise.all([
                mutate(AI_SUMMARY_KEY),
                mutate(AI_ROADMAP_KEY),
                mutate(AI_SKILL_GAPS_KEY),
                mutate(AI_READINESS_KEY),
                mutate(AI_QUESTIONS_KEY),
            ]);
        } finally {
            setIsRegenerating(false);
        }
    };

    return {
        summary,
        roadmap: roadmap ?? [],
        skillGaps: skillGaps ?? [],
        readiness,
        questions: questions ?? [],
        isLoading: summaryLoading || roadmapLoading || skillGapsLoading || readinessLoading || questionsLoading,
        hasError: !!(summaryError || roadmapError || skillGapsError || readinessError || questionsError),
        hasNoData,
        isRegenerating,
        regenerateMessage,
        regenerate,
    };
}

/**
 * UC-AI-02: Dashboard Readiness Score Widget
 * Business Rules:
 * - Lightweight fetch of readiness score only (for dashboard stat card)
 */
export function useAIReadiness() {
    const { data, error, isLoading } = useSWR<AIReadiness>(AI_READINESS_KEY, getAIReadiness, {
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
            if (error?.response?.status === 404) return;
            if (retryCount >= 3) return;
            setTimeout(() => revalidate({ retryCount }), 5000);
        },
    });

    return {
        readiness: data,
        loading: isLoading,
        notAvailable: error?.response?.status === 404,
    };
}
