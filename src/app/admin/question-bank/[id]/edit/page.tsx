'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useUpdateQuestion, useQuestionDetail } from '@/modules/question-bank/hooks';
import QuestionForm from '@/components/question-bank/QuestionForm';
import { QuestionFormValues } from '@/modules/question-bank/validation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { QuestionStatus } from '@/modules/question-bank/types';

export default function EditQuestionPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const { question, loading: loadingDetail, fetchQuestion } = useQuestionDetail(id);
    const { updateQuestion, loading: loadingUpdate } = useUpdateQuestion();

    // useEffect(() => {
    //   if (id) fetchQuestion();
    // }, [id, fetchQuestion]);
    // useQuestionDetail calls fetch on mount if id is present.

    const handleSubmit = async (data: QuestionFormValues) => {
        try {
            if (!id) return;
            // Cast data. Ensure status is included.
            const updatePayload = {
                ...data,
                // Ensure status comes from form or default
                status: (data.status as QuestionStatus) || QuestionStatus.ACTIVE
            };
            await updateQuestion(id, updatePayload);
            router.push(`/admin/question-bank/${id}`);
        } catch (error) {
            console.error('Failed to update question', error);
            alert('Failed to update question.');
        }
    };

    if (loadingDetail) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    if (!question && !loadingDetail) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-slate-400">
                Question not found.
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <Link
                    href={`/admin/question-bank/${id}`}
                    className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Detail
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Question</h1>
                <p className="text-slate-400 mt-2">Update question details.</p>
            </div>

            {question && (
                <QuestionForm
                    initialData={question}
                    onSubmit={handleSubmit}
                    loading={loadingUpdate}
                />
            )}
        </div>
    );
}
