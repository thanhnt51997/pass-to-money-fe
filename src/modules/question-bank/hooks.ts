import { useState, useCallback, useEffect } from 'react';
import * as api from './api';
import {
    CreateQuestionRequest,
    GenerateQuestionRequest,
    Question,
    QuestionListParams,
    QuestionListResponse,
    UpdateQuestionRequest,
} from './types';

/**
 * UC-Admin-01: List Questions
 * Business Rules:
 * - Fetch questions with pagination and filters
 * - Admin only
 */
export const useQuestionList = (initialParams: QuestionListParams = {}) => {
    const [data, setData] = useState<QuestionListResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [params, setParams] = useState<QuestionListParams>(initialParams);

    const fetchQuestions = useCallback(async (fetchParams?: QuestionListParams) => {
        setLoading(true);
        setError(null);
        try {
            const mergedParams = { ...params, ...fetchParams };
            const result = await api.getQuestions(mergedParams);
            setData(result);
            if (fetchParams) {
                setParams(mergedParams);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [params]);

    // Initial fetch or when params change?
    // Usually for a list, we might want manual trigger or auto trigger.
    // Let's expose fetchQuestions to be called by UI (e.g. on mount or filter change).
    // Or use useEffect if we want auto-fetch on mount.
    // Given it's a list hook, auto-fetch on mount is common, but params might change.
    // Let's do useEffect with dependency on JSON.stringify(params) to avoid deep loops, or just expose refetch.
    // Simpler: Expose `fetchQuestions` and let the component call it in useEffect.
    // However, standard useHook often does it automatically.
    // Let's add useEffect.

    useEffect(() => {
        fetchQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only mount. Component can call fetchQuestions(newParams) to update.

    return { data, loading, error, fetchQuestions, params, setParams };
};

/**
 * UC-Admin-02: Get Question Detail
 * Business Rules:
 * - Fetch single question details
 */
export const useQuestionDetail = (id: string) => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchQuestion = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const result = await api.getQuestionDetail(id);
            setQuestion(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion]);

    return { question, loading, error, fetchQuestion };
};

/**
 * UC-Admin-03: Create Question
 */
export const useCreateQuestion = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const createQuestion = async (data: CreateQuestionRequest) => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.createQuestion(data);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createQuestion, loading, error };
};

/**
 * UC-Admin-04: Update Question
 */
export const useUpdateQuestion = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const updateQuestion = async (id: string, data: UpdateQuestionRequest) => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.updateQuestion(id, data);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateQuestion, loading, error };
};

/**
 * UC-Admin-05: Archive Question
 */
export const useArchiveQuestion = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const archiveQuestion = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await api.archiveQuestion(id);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { archiveQuestion, loading, error };
};

/**
 * UC-Admin-06: Bulk Import Questions
 */
export const useImportQuestions = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    // Adjusted to match api.ts which expects data object
    const importQuestions = async (questions: CreateQuestionRequest[]) => {
        setLoading(true);
        setError(null);
        try {
            // api.bulkImportQuestions expects { questions: ... }
            const result = await api.bulkImportQuestions({ questions });
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { importQuestions, loading, error };
};

/**
 * UC-Admin-07: AI Generate Question
 */
export const useGenerateQuestion = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

    const generate = async (params: GenerateQuestionRequest) => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.generateQuestions(params);
            setGeneratedQuestions(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { generate, generatedQuestions, loading, error };
}
