'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTemplateDetail, useUpdateTemplate } from '@/modules/interview-template/hooks';
import TemplateQuestionManager from '@/components/interview-template/TemplateQuestionManager';
import { ArrowLeft, Loader2, Edit, Play } from 'lucide-react';
import Link from 'next/link';
import { TemplateStatus } from '@/modules/interview-template/types';

export default function TemplateDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { template, loading, refresh } = useTemplateDetail(id);
    const { changeStatus, loading: loadingStatus } = useUpdateTemplate();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    if (!template) {
        return <div className="p-8 text-center text-gray-500">Template not found.</div>;
    }

    const handlePublish = async () => {
        if (confirm('Are you sure you want to publish this template? It will be available for interviews.')) {
            await changeStatus(id, TemplateStatus.ACTIVE);
            refresh();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link
                        href="/admin/interview-templates"
                        className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to List
                    </Link>
                    <h1 className="text-3xl font-bold text-white">{template.name}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase border ${template.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                template.status === 'draft' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                                    'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                            {template.status}
                        </span>
                        <span className="text-slate-400 text-sm">{template.stack} • {template.level} • {template.duration_minutes} mins</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    {template.status === 'draft' && (
                        <button
                            onClick={handlePublish}
                            disabled={loadingStatus}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors shadow-lg shadow-green-500/20"
                        >
                            <Play size={16} />
                            Publish
                        </button>
                    )}
                    <Link
                        href={`/admin/interview-templates/${id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                    >
                        <Edit size={16} />
                        Edit Info
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Questions */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-[#050505]/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                        <TemplateQuestionManager
                            templateId={id}
                            questions={template.questions || []}
                            refresh={refresh}
                        />
                    </section>
                </div>

                {/* Sidebar: Details */}
                <div className="space-y-6">
                    <div className="bg-[#050505]/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 text-sm">
                        <h3 className="font-semibold text-white mb-2">Details</h3>
                        <div>
                            <span className="block text-gray-500 text-xs uppercase tracking-wider">Description</span>
                            <p className="text-gray-300 mt-1">{template.description || 'No description'}</p>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs uppercase tracking-wider">Strategy</span>
                            <p className="text-gray-300 mt-1 capitalize">{template.scoring_strategy.replace('_', ' ')}</p>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs uppercase tracking-wider">Version</span>
                            <p className="text-gray-300 mt-1">{template.version}</p>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs uppercase tracking-wider">Last Updated</span>
                            <p className="text-gray-300 mt-1">{new Date(template.updated_at || Date.now()).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
