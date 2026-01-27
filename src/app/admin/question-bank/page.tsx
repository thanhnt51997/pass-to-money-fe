'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Upload } from 'lucide-react';
import { useQuestionList, useArchiveQuestion } from '@/modules/question-bank/hooks';
import QuestionFilters from '@/components/question-bank/QuestionFilters';
import QuestionListTable from '@/components/question-bank/QuestionListTable';

export default function QuestionBankListPage() {
    const { data, loading, fetchQuestions, params, setParams } = useQuestionList({
        page: 1,
        per_page: 15,
    });
    const { archiveQuestion } = useArchiveQuestion();

    // Handle filter changes
    const handleFilterChange = (newParams: any) => {
        setParams(newParams);
        fetchQuestions(newParams);
    };

    // Handle Archive
    const handleArchive = async (id: string) => {
        try {
            await archiveQuestion(id);
            fetchQuestions(); // Refresh list after archive
        } catch (error) {
            console.error('Failed to archive question', error);
            alert('Failed to archive question');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Question Bank</h1>
                    <p className="text-slate-400">Manage your interview questions library.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/question-bank/import"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all border border-slate-700"
                    >
                        <Upload size={18} />
                        <span>Import</span>
                    </Link>
                    <Link
                        href="/admin/question-bank/create"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={18} />
                        <span>Create Question</span>
                    </Link>
                </div>
            </div>

            <QuestionFilters params={params} onChange={handleFilterChange} />

            <QuestionListTable
                questions={data?.items || []}
                loading={loading}
                onArchive={handleArchive}
            />

            {/* Pagination (Simple) */}
            {data?.meta && (
                <div className="flex justify-between items-center mt-4 text-sm text-slate-400">
                    <span>
                        Showing {((data.meta.current_page - 1) * (params.per_page || 15)) + 1} to {Math.min(data.meta.current_page * (params.per_page || 15), data.meta.total)} of {data.meta.total} results
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={data.meta.current_page === 1}
                            onClick={() => handleFilterChange({ ...params, page: data.meta.current_page - 1 })}
                            className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <div className="px-2 py-1">Page {data.meta.current_page} of {data.meta.last_page}</div>
                        <button
                            disabled={data.meta.current_page === data.meta.last_page}
                            onClick={() => handleFilterChange({ ...params, page: data.meta.current_page + 1 })}
                            className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
