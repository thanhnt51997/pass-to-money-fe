import { z } from 'zod';
import { QuestionDifficulty, QuestionLevel, QuestionType, QuestionStatus } from './types';

export const questionSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(255),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    type: z.nativeEnum(QuestionType),
    stack: z.string().min(1, 'Stack is required'),
    technologies: z.array(z.string()).optional(), // Can be empty
    level: z.nativeEnum(QuestionLevel),
    difficulty: z.nativeEnum(QuestionDifficulty),
    expected_answer: z.string().optional(),
    evaluation_criteria: z.string().optional(),
    tags: z.array(z.string()).optional(),
    status: z.nativeEnum(QuestionStatus).optional(),
});

export type QuestionFormValues = z.infer<typeof questionSchema>;
