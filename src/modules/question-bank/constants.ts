import { QuestionDifficulty, QuestionLevel, QuestionType } from './types';

export const QUESTION_TYPES = [
    { label: 'Theoretical', value: QuestionType.THEORETICAL },
    { label: 'Coding', value: QuestionType.CODING },
    { label: 'System Design', value: QuestionType.SYSTEM_DESIGN },
    { label: 'Behavioral', value: QuestionType.BEHAVIORAL },
];

export const QUESTION_LEVELS = [
    { label: 'Intern', value: QuestionLevel.INTERN },
    { label: 'Junior', value: QuestionLevel.JUNIOR },
    { label: 'Middle', value: QuestionLevel.MIDDLE },
    { label: 'Senior', value: QuestionLevel.SENIOR },
    { label: 'Lead', value: QuestionLevel.LEAD },
];

export const QUESTION_DIFFICULTIES = [
    { label: 'Easy', value: QuestionDifficulty.EASY },
    { label: 'Medium', value: QuestionDifficulty.MEDIUM },
    { label: 'Hard', value: QuestionDifficulty.HARD },
];

export const QUESTION_STACKS = [
    { label: 'Backend', value: 'Backend' },
    { label: 'Frontend', value: 'Frontend' },
    { label: 'Fullstack', value: 'Fullstack' },
    { label: 'Mobile', value: 'Mobile' },
    { label: 'DevOps', value: 'DevOps' },
    { label: 'AI/ML', value: 'AI' },
    { label: 'System Design', value: 'System Design' },
];

export const QUESTION_BANK_QUERY_KEYS = {
    LIST: 'QUESTION_BANK_LIST',
    DETAIL: 'QUESTION_BANK_DETAIL',
};
