'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateTemplate } from '@/modules/interview-template/hooks';
import TemplateForm from '@/components/interview-template/TemplateForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CreateTemplateRequest } from '@/modules/interview-template/types';

export default function CreateTemplatePage() {
    const router = useRouter();
    const { createTemplate, loading } = useCreateTemplate();

    const handleSubmit = async (data: CreateTemplateRequest) => {
        try {
            await createTemplate(data);
            router.push('/admin/interview-templates');
        } catch (error) {
            console.error('Failed to create template', error);
            alert('Failed to create template');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <Link
                    href="/admin/interview-templates"
                    className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to List
                </Link>
                <h1 className="text-3xl font-bold text-white">Create New Template</h1>
                <p className="text-slate-400 mt-2">Define the structure for a new interview type.</p>
            </div>

            <TemplateForm onSubmit={handleSubmit} loading={loading} />
        </div>
    );
}
