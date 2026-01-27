
export enum QuestionType {
    THEORETICAL = 'theoretical',
    CODING = 'coding',
    SYSTEM_DESIGN = 'system_design',
    BEHAVIORAL = 'behavioral',
}

export enum QuestionLevel {
    INTERN = 'Intern',
    JUNIOR = 'Junior',
    MIDDLE = 'Middle',
    SENIOR = 'Senior',
    LEAD = 'Lead',
}

export enum QuestionDifficulty {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard',
}

export enum QuestionStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVED = 'archived',
}

export interface Question {
    id: string;
    title: string;
    content: string;
    type: QuestionType;
    stack: string;
    technologies: string[];
    level: QuestionLevel;
    difficulty: QuestionDifficulty;
    expected_answer: string; // Markdown supported
    evaluation_criteria: string;
    tags: string[];
    status: QuestionStatus;
    created_by?: number;
    created_at: string;
    updated_at: string;
}

export interface CreateQuestionRequest {
    title: string;
    content: string;
    type: QuestionType;
    stack: string;
    technologies?: string[];
    level: QuestionLevel;
    difficulty: QuestionDifficulty;
    expected_answer?: string;
    evaluation_criteria?: string;
    tags?: string[];
}

export interface UpdateQuestionRequest extends Partial<CreateQuestionRequest> {
    status?: QuestionStatus;
}

export interface QuestionListParams {
    stack?: string;
    technology?: string;
    level?: string;
    difficulty?: string;
    type?: string;
    status?: string;
    keyword?: string;
    page?: number;
    per_page?: number;
}

export interface QuestionListResponse {
    items: Question[];
    meta: {
        total: number;
        current_page: number;
        last_page: number;
    };
}

export interface GenerateQuestionRequest {
    stack: string;
    level: string;
    technology?: string;
    difficulty: QuestionDifficulty;
    type: QuestionType;
    count?: number;
}
