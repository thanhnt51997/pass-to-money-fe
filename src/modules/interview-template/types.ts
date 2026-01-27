import { QuestionType } from "@/modules/question-bank/types";

export interface InterviewTemplate {
    id: string;
    name: string;
    description?: string;
    stack: string;
    level: string;
    duration_minutes: number;
    scoring_strategy: TemplateScoringStrategy;
    status: TemplateStatus;
    version: string;
    questions?: TemplateQuestion[];
    created_at?: string;
    updated_at?: string;
}

export enum TemplateStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVED = 'archived'
}

export enum TemplateScoringStrategy {
    AVERAGE = 'average',
    WEIGHTED = 'weighted',
    AI_ONLY = 'ai_only'
}

export interface TemplateQuestion {
    id: string; // The relationship ID
    question_id: string; // The actual question ID
    order: number;
    weight: number;
    mandatory: boolean;
    time_limit: number;
    // Expanded fields from Question
    title?: string;
    type?: QuestionType;
}

export interface CreateTemplateRequest {
    name: string;
    description?: string;
    stack: string;
    level: string;
    duration_minutes: number;
    scoring_strategy: TemplateScoringStrategy;
}

export interface UpdateTemplateRequest extends Partial<CreateTemplateRequest> {
    status?: TemplateStatus;
}

export interface AddQuestionToTemplateRequest {
    question_id: string;
    order: number;
    weight: number;
    mandatory: boolean;
    time_limit: number;
}

export interface UpdateTemplateQuestionRequest {
    order?: number;
    weight?: number;
    mandatory?: boolean;
    time_limit?: number;
}

export interface TemplateListParams {
    page?: number;
    per_page?: number;
    status?: TemplateStatus;
    search?: string;
    stack?: string;
    level?: string;
}

export interface TemplateListResponse {
    data: {
        items: InterviewTemplate[];
        meta: {
            current_page: number;
            last_page: number;
            total: number;
            per_page: number;
        };
    };
}
