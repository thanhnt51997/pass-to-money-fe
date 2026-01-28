'use client';

import React, { useState } from 'react';
import { useTemplateList } from '@/modules/interview-template/hooks';
import { useStartInterview } from '@/modules/interview/hooks';
import TemplateSelectionCard from '@/components/interview/TemplateSelectionCard';
import { Search, Loader2 } from 'lucide-react';
import { TemplateStatus } from '@/modules/interview-template/types';

export default function StartInterviewPage() {
    const [search, setSearch] = useState('');
    // We only fetch ACTIVE templates for candidates
    const { data, loading: fetching } = useTemplateList({
        status: TemplateStatus.ACTIVE,
        page: 1,
        per_page: 50 // Fetch enough to scroll, or impl pagination later
    });

    const { startInterview } = useStartInterview();
    const [startingId, setStartingId] = useState<string | null>(null);

    const handleStart = async (templateId: string) => {
        setStartingId(templateId);
        try {
            await startInterview(templateId);
        } catch (error) {
            console.error('Failed to start interview:', error);
            // Handle error toast here if needed
            setStartingId(null);
        }
    };

    const filteredTemplates = data?.items.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.stack.toLowerCase().includes(search.toLowerCase()) ||
        t.level.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <div className="flex min-h-screen bg-[#050505]">
            <main className="flex-1 p-8 ml-64">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                                Start New Interview
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Choose a template below to begin your practice session.
                            </p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, stack, or level..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    {fetching ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="animate-spin text-cyan-500" size={32} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTemplates.length > 0 ? (
                                filteredTemplates.map(template => (
                                    <TemplateSelectionCard
                                        key={template.id}
                                        template={template}
                                        onStart={handleStart}
                                        loading={startingId === template.id}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-500 bg-white/2 rounded-xl border border-dashed border-white/10">
                                    No templates found matching your search.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
