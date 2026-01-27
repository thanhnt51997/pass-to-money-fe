'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { InterviewTemplate, TemplateStatus } from '@/modules/interview-template/types';
import { format } from 'date-fns';

interface TemplateListTableProps {
    templates: InterviewTemplate[];
    loading?: boolean;
    onDelete?: (id: string) => void;
}

export default function TemplateListTable({ templates, loading, onDelete }: TemplateListTableProps) {
    if (loading) {
        return (
            <div className="w-full bg-[#050505]/50 border border-white/10 rounded-xl p-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (templates.length === 0) {
        return (
            <div className="w-full bg-[#050505]/50 border border-white/10 rounded-xl p-12 text-center">
                <p className="text-gray-400">No interview templates found.</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-[#050505]/50 backdrop-blur-md">
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-white/5 text-xs uppercase text-gray-300">
                    <tr>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Stack / Level</th>
                        <th className="px-6 py-4 font-semibold">Duration</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Last Updated</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {templates.map((template) => (
                        <tr key={template.id} className="group hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">
                                <Link href={`/admin/interview-templates/${template.id}`} className="hover:text-cyan-400 transition-colors">
                                    {template.name}
                                </Link>
                                <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                                    {template.description}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20 w-fit">
                                        {template.stack}
                                    </span>
                                    <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-500/20 w-fit">
                                        {template.level}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {template.duration_minutes} mins
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={template.status} />
                            </td>
                            <td className="px-6 py-4">
                                {template.updated_at ? format(new Date(template.updated_at), 'MMM dd, yyyy') : '-'}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/admin/interview-templates/${template.id}`}
                                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                        title="View Detail"
                                    >
                                        <Eye size={16} />
                                    </Link>
                                    <Link
                                        href={`/admin/interview-templates/${template.id}/edit`}
                                        className="p-2 rounded-lg bg-white/5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    {template.status !== TemplateStatus.ARCHIVED && onDelete && (
                                        <button
                                            onClick={() => onDelete(template.id)}
                                            className="p-2 rounded-lg bg-white/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                            title="Archive"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StatusBadge({ status }: { status: TemplateStatus }) {
    switch (status) {
        case TemplateStatus.ACTIVE:
            return (
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                    Active
                </span>
            );
        case TemplateStatus.ARCHIVED:
            return (
                <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20">
                    Archived
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center rounded-full bg-gray-500/10 px-2.5 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-500/20">
                    Draft
                </span>
            );
    }
}
