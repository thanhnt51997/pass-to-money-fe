'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useQuestionList } from '@/modules/question-bank/hooks';
import { Question } from '@/modules/question-bank/types';

interface QuestionSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (questions: Question[]) => void;
}

export default function QuestionSelectorModal({ isOpen, onClose, onSelect }: QuestionSelectorModalProps) {
    const { data, loading, params, setParams } = useQuestionList({ page: 1, per_page: 10 });
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    if (!isOpen) return null;

    const items = data?.items || [];

    const toggleSelection = (id: string) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    const handleConfirm = () => {
        const selected = items.filter(i => selectedIds.has(i.id));
        // Note: This only selects from CURRENT PAGE.
        // For a real app, we might need selected items across pagination, but keeping it simple.
        onSelect(selected);
        setSelectedIds(new Set());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-3xl bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-semibold text-white">Add Questions</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {/* Simplified Filter - Just Search */}
                    <input
                        type="text"
                        placeholder="Search questions..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-cyan-500"
                        onChange={(e) => setParams({ ...params, keyword: e.target.value, page: 1 })}
                    />

                    <div className="space-y-2">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">Loading...</div>
                        ) : items.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">No questions found.</div>
                        ) : (
                            items.map(q => {
                                const isSelected = selectedIds.has(q.id);
                                return (
                                    <div
                                        key={q.id}
                                        onClick={() => toggleSelection(q.id)}
                                        className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${isSelected
                                            ? 'bg-cyan-500/10 border-cyan-500/50'
                                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-gray-600'
                                            }`}>
                                            {isSelected && <Check size={12} className="text-black" />}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium text-sm">{q.title}</h4>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-gray-300">{q.type}</span>
                                                <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-gray-300">{q.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-[#09090b]">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={selectedIds.size === 0}
                        className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Selected ({selectedIds.size})
                    </button>
                </div>
            </div>
        </div>
    );
}
