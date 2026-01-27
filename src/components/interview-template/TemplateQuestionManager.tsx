'use client';

import React, { useState } from 'react';
import { TemplateQuestion, AddQuestionToTemplateRequest } from '@/modules/interview-template/types';
import { Plus, Trash2, GripVertical, Clock } from 'lucide-react';
import { useTemplateQuestions } from '@/modules/interview-template/hooks';
import QuestionSelectorModal from './QuestionSelectorModal';

interface TemplateQuestionManagerProps {
    templateId: string;
    questions: TemplateQuestion[];
    refresh: () => void;
}

export default function TemplateQuestionManager({ templateId, questions, refresh }: TemplateQuestionManagerProps) {
    const { addQuestion, removeQuestion, loading } = useTemplateQuestions();
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);

    // Sort questions by order
    const sortedQuestions = [...(questions || [])].sort((a, b) => a.order - b.order);

    const handleAddQuestions = async (selectedQuestions: any[]) => {
        // Add each selected question to the template
        // Calculate next order
        let nextOrder = sortedQuestions.length > 0 ? Math.max(...sortedQuestions.map(q => q.order)) + 1 : 1;

        for (const q of selectedQuestions) {
            const payload: AddQuestionToTemplateRequest = {
                question_id: q.id,
                order: nextOrder++,
                weight: 1, // Default weight
                mandatory: true, // Default
                time_limit: 300 // Default 5 mins
            };
            await addQuestion(templateId, payload);
        }
        setIsSelectorOpen(false);
        refresh();
    };

    const handleRemove = async (questionRelId: string) => {
        if (confirm('Remove this question from template?')) {
            await removeQuestion(templateId, questionRelId);
            refresh();
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Questions ({questions?.length || 0})</h3>
                <button
                    onClick={() => setIsSelectorOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                    <Plus size={16} />
                    Add Questions
                </button>
            </div>

            <div className="space-y-2">
                {sortedQuestions.length === 0 ? (
                    <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-gray-500 bg-[#050505]/30">
                        No questions added yet.
                    </div>
                ) : (
                    sortedQuestions.map((q, index) => (
                        <div key={q.id} className="group flex items-center justify-between p-4 bg-[#050505]/50 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="text-gray-600 cursor-move">
                                    <GripVertical size={20} />
                                </div>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-bold">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">{q.title || 'Untitled Question'}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                        <span className="uppercase">{q.type}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {Math.floor(q.time_limit / 60)}m
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                        <span>Weight: {q.weight}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(q.id)}
                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <QuestionSelectorModal
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
                onSelect={handleAddQuestions}
            />
        </div>
    );
}
