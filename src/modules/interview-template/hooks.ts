import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { interviewTemplateApi } from './api';
import { TEMPLATE_QUERY_KEYS } from './constants';
import {
    TemplateListParams,
    CreateTemplateRequest,
    UpdateTemplateRequest,
    AddQuestionToTemplateRequest,
    UpdateTemplateQuestionRequest,
    TemplateStatus
} from './types';

export function useTemplateList(initialParams?: TemplateListParams) {
    const [params, setParams] = useState<TemplateListParams>(initialParams || { page: 1, per_page: 15 });

    const { data, error, isLoading } = useSWR(
        [TEMPLATE_QUERY_KEYS.LIST, JSON.stringify(params)],
        () => interviewTemplateApi.list(params)
    );

    return {
        data,
        loading: isLoading,
        error,
        params,
        setParams,
        refresh: () => mutate([TEMPLATE_QUERY_KEYS.LIST, JSON.stringify(params)])
    };
}

export function useTemplateDetail(id: string) {
    const { data, error, isLoading, mutate: refresh } = useSWR(
        id ? [TEMPLATE_QUERY_KEYS.DETAIL, id] : null,
        () => interviewTemplateApi.getDetail(id)
    );

    return {
        template: data,
        loading: isLoading,
        error,
        refresh
    };
}

export function useCreateTemplate() {
    const [loading, setLoading] = useState(false);

    const createTemplate = async (data: CreateTemplateRequest) => {
        setLoading(true);
        try {
            const res = await interviewTemplateApi.create(data);
            return res;
        } finally {
            setLoading(false);
        }
    };

    return { createTemplate, loading };
}

export function useUpdateTemplate() {
    const [loading, setLoading] = useState(false);

    const updateTemplate = async (id: string, data: UpdateTemplateRequest) => {
        setLoading(true);
        try {
            const res = await interviewTemplateApi.update(id, data);
            // Invalidate detail
            mutate([TEMPLATE_QUERY_KEYS.DETAIL, id]);
            return res;
        } finally {
            setLoading(false);
        }
    };

    const changeStatus = async (id: string, status: TemplateStatus) => {
        setLoading(true);
        try {
            const res = await interviewTemplateApi.changeStatus(id, status);
            mutate([TEMPLATE_QUERY_KEYS.DETAIL, id]);
            return res;
        } finally {
            setLoading(false);
        }
    };

    return { updateTemplate, changeStatus, loading };
}

export function useTemplateQuestions() {
    const [loading, setLoading] = useState(false);

    const addQuestion = async (templateId: string, data: AddQuestionToTemplateRequest) => {
        setLoading(true);
        try {
            await interviewTemplateApi.addQuestion(templateId, data);
            mutate([TEMPLATE_QUERY_KEYS.DETAIL, templateId]);
        } finally {
            setLoading(false);
        }
    };

    const removeQuestion = async (templateId: string, questionId: string) => {
        setLoading(true);
        try {
            await interviewTemplateApi.removeQuestion(templateId, questionId);
            mutate([TEMPLATE_QUERY_KEYS.DETAIL, templateId]);
        } finally {
            setLoading(false);
        }
    };

    const updateQuestion = async (templateId: string, questionId: string, data: UpdateTemplateQuestionRequest) => {
        setLoading(true);
        try {
            await interviewTemplateApi.updateQuestion(templateId, questionId, data);
            mutate([TEMPLATE_QUERY_KEYS.DETAIL, templateId]);
        } finally {
            setLoading(false);
        }
    };

    return { addQuestion, removeQuestion, updateQuestion, loading };
}
