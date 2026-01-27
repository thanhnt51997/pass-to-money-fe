'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateQuestion } from '@/modules/question-bank/hooks';
import QuestionForm from '@/components/question-bank/QuestionForm';
import { QuestionFormValues } from '@/modules/question-bank/validation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateQuestionPage() {
    const router = useRouter();
    const { createQuestion, loading } = useCreateQuestion();

    const handleSubmit = async (data: QuestionFormValues) => {
        try {
            // Cast data to CreateQuestionRequest (Types are almost same, but validation/form values might have minor diffs)
            await createQuestion(data as any);
            router.push('/admin/question-bank');
        } catch (error) {
            console.error('Failed to create question', error);
            alert('Failed to create question. Please check the inputs.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <Link
                    href="/admin/question-bank"
                    className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to List
                </Link>
                <h1 className="text-3xl font-bold text-white">Create New Question</h1>
                <p className="text-slate-400 mt-2">Add a new interview question to the bank.</p>
            </div>

            <QuestionForm onSubmit={handleSubmit} loading={loading} />
        </div>
    );
}
