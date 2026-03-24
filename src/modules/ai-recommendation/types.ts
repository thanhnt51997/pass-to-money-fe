export interface AIRecommendationSummary {
    overallScore: number;
    readinessLevel: string;
    strengths: string[];
    areasForImprovement: string[];
    lastUpdatedAt: string;
}

export interface AIRoadmapPhase {
    phase: number;
    title: string;
    description: string;
    estimatedDurationWeeks: number;
    skills: string[];
}

export interface AISkillGap {
    dimension: string;
    currentScore: number;
    targetScore: number;
    gap: number;
    recommendations: string[];
}

export interface AIReadiness {
    score: number;
    level: 'NOT_READY' | 'PARTIALLY_READY' | 'READY' | 'HIGHLY_READY';
    breakdowns: Record<string, number>;
}

export interface AIRecommendedQuestion {
    id: number;
    content: string;
    type: string;
    difficulty: string;
    rationale: string;
}

export interface AIRegenerateResponse {
    status: 'queued' | 'processing';
    message: string;
}
