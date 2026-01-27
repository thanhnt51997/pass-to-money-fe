'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuestionDetail } from '@/modules/question-bank/hooks';
import QuestionDetailView from '@/components/question-bank/QuestionDetailView';
import { Loader2 } from 'lucide-react';

export default function QuestionDetailPage() {
    const params = useParams();
    const id = params?.id as string;

    const { question, loading } = useQuestionDetail(id);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    if (!question) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-slate-400">
                Question not found.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <QuestionDetailView question={question} />
        </div>
    );
}
