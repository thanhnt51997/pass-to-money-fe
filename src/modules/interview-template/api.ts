import http from '@/lib/http';
import {
    InterviewTemplate,
    CreateTemplateRequest,
    UpdateTemplateRequest,
    TemplateListParams,
    TemplateListResponse,
    AddQuestionToTemplateRequest,
    UpdateTemplateQuestionRequest,
    TemplateStatus
} from './types';

const BASE_URL = '/api/admin/templates';

export const interviewTemplateApi = {
    list: async (params?: TemplateListParams): Promise<TemplateListResponse['data']> => {
        const res = await http.get<{ success: boolean; data: TemplateListResponse['data'] }>(BASE_URL, { params });
        return res.data.data;
    },

    getDetail: async (id: string): Promise<InterviewTemplate> => {
        const res = await http.get<{ success: boolean; data: InterviewTemplate }>(`${BASE_URL}/${id}`);
        return res.data.data;
    },

    create: async (data: CreateTemplateRequest): Promise<InterviewTemplate> => {
        const res = await http.post<{ success: boolean; data: InterviewTemplate }>(BASE_URL, data);
        return res.data.data;
    },

    update: async (id: string, data: UpdateTemplateRequest): Promise<InterviewTemplate> => {
        const res = await http.put<{ success: boolean; data: InterviewTemplate }>(`${BASE_URL}/${id}`, data);
        return res.data.data;
    },

    changeStatus: async (id: string, status: TemplateStatus): Promise<InterviewTemplate> => {
        // Assuming a specific endpoint or just using update if no specific endpoint
        // The API List shows "ChangeTemplateStatus", let's assume it's PATCH or PUT /status
        // Looking at API doc 8. ChangeTemplateStatus.md, usually it's PATCH /{id}/status
        // I'll stick to a standard PUT update for now unless I see the doc.
        // Actually, let's just use update if it supports status.
        // But since there is a specific doc "ChangeTemplateStatus", likely separate.
        // I'll assume PATCH `${BASE_URL}/${id}/status`
        const res = await http.patch<{ success: boolean; data: InterviewTemplate }>(`${BASE_URL}/${id}/status`, { status });
        return res.data.data;
    },

    addQuestion: async (templateId: string, data: AddQuestionToTemplateRequest): Promise<void> => {
        await http.post(`${BASE_URL}/${templateId}/questions`, data);
    },

    removeQuestion: async (templateId: string, questionId: string): Promise<void> => {
        // questionId here likely refers to the "relationship" ID or the Question ID?
        // API Doc 5. RemoveQuestionFromTemplate says "relationship ID" usually or "question ID".
        // Let's assume relationship ID (item in `questions` array) or question ID?
        // Usually remove question from template means remove the link.
        // I will use questionId as the identifier.
        await http.delete(`${BASE_URL}/${templateId}/questions/${questionId}`);
    },

    updateQuestion: async (templateId: string, questionId: string, data: UpdateTemplateQuestionRequest): Promise<void> => {
        await http.put(`${BASE_URL}/${templateId}/questions/${questionId}`, data);
    }
};
