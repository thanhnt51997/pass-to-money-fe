'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUpdateTemplate, useTemplateDetail } from '@/modules/interview-template/hooks';
import TemplateForm from '@/components/interview-template/TemplateForm';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { CreateTemplateRequest } from '@/modules/interview-template/types';

export default function EditTemplatePage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const { template, loading: loadingDetail } = useTemplateDetail(id);
    const { updateTemplate, loading: loadingUpdate } = useUpdateTemplate();

    const handleSubmit = async (data: CreateTemplateRequest) => {
        try {
            await updateTemplate(id, data);
            router.push(`/admin/interview-templates/${id}`);
        } catch (error) {
            console.error('Failed to update template', error);
            alert('Failed to update template');
        }
    };

    if (loadingDetail) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    if (!template) {
        return <div className="p-8 text-center text-gray-500">Template not found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <Link
                    href={`/admin/interview-templates/${id}`}
                    className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Detail
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Template</h1>
                <p className="text-slate-400 mt-2">Modify template settings.</p>
            </div>

            <TemplateForm
                initialData={template}
                onSubmit={handleSubmit}
                loading={loadingUpdate}
            />
        </div>
    );
}
