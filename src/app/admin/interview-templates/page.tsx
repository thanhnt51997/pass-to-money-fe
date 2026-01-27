'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useTemplateList } from '@/modules/interview-template/hooks';
import TemplateListTable from '@/components/interview-template/TemplateListTable';

export default function TemplatesListPage() {
    const { data, loading, refresh } = useTemplateList();

    // No delete implementation in API wrapper yet, keeping it strictly as per plan
    // Or I can omit delete for now.
    // The plan mentioned "Archive" in table, reusing changeStatus if delete not available?
    // Or just omitting delete prop.

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Interview Templates</h1>
                    <p className="text-slate-400">Manage standard interview structures.</p>
                </div>
                <Link
                    href="/admin/interview-templates/create"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                >
                    <Plus size={18} />
                    <span>Create Template</span>
                </Link>
            </div>

            <TemplateListTable
                templates={data?.items || []}
                loading={loading}
            />
        </div>
    );
}
