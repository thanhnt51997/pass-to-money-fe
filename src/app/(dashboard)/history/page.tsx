'use client';

import React from 'react';
import { useInterviewHistory } from '@/modules/user/hooks';
import { Loader2, ArrowUpRight, Calendar, Layers, Award } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
    const { data, loading, error } = useInterviewHistory();
    const router = useRouter();

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="animate-spin text-cyan-500" size={32} />
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-red-400">Failed to load history.</div>;
    }

    const items = data?.items || [];

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                Interview History
            </h1>

            <div className="bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden">
                {items.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No interviews found. Start your first practice session!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Session</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Topic</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Score</th>
                                    <th className="px-6 py-4 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {items.map((item) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => router.push(`/interview/${item.id}/result`)}
                                        className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-mono text-xs border border-cyan-500/20">
                                                    #{item.id.substring(0, 4)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                <Calendar size={14} className="text-gray-500" />
                                                {format(new Date(item.started_at), 'MMM d, yyyy HH:mm')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-white font-medium text-sm">
                                                    <Layers size={14} className="text-purple-400" />
                                                    {item.stack}
                                                </div>
                                                <span className="text-xs text-gray-500 ml-6">{item.level}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium border ${item.status === 'EVALUATED'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : item.status === 'SUBMITTED'
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {item.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {item.score !== null ? (
                                                <span className={`text-lg font-bold ${item.score >= 80 ? 'text-green-400' :
                                                        item.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                                                    }`}>
                                                    {item.score}
                                                </span>
                                            ) : (
                                                <span className="text-gray-600 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                                                <ArrowUpRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
