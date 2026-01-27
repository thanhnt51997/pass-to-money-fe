import React from 'react';
import Link from 'next/link';
import { Question, QuestionStatus } from '@/modules/question-bank/types';
import { Edit2, Eye, Trash2 } from 'lucide-react';

interface QuestionListTableProps {
    questions: Question[];
    loading: boolean;
    onArchive: (id: string) => void;
}

const QuestionListTable: React.FC<QuestionListTableProps> = ({ questions, loading, onArchive }) => {
    if (loading) {
        return (
            <div className="w-full h-64 flex items-center justify-center text-slate-400 animate-pulse">
                Loading questions...
            </div>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center text-slate-500 border border-dashed border-slate-700 rounded-xl">
                No questions found.
            </div>
        );
    }

    const getStatusColor = (status: QuestionStatus) => {
        switch (status) {
            case QuestionStatus.ACTIVE:
                return 'text-green-400 bg-green-400/10 border-green-400/20';
            case QuestionStatus.DRAFT:
                return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case QuestionStatus.ARCHIVED:
                return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
            default:
                return 'text-slate-400';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'hard': return 'text-red-400';
            default: return 'text-slate-400';
        }
    }

    return (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-white/5 uppercase text-xs font-semibold tracking-wider text-slate-400">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Stack/Tech</th>
                        <th className="px-6 py-4">Level & Diff</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {questions.map((question) => (
                        <tr
                            key={question.id}
                            className="hover:bg-white/5 transition-colors duration-200"
                        >
                            <td className="px-6 py-4">
                                <div className="font-medium text-white line-clamp-1" title={question.title}>
                                    {question.title}
                                </div>
                                <div className="text-xs text-slate-500 line-clamp-1 mt-1">
                                    {question.content.substring(0, 60)}...
                                </div>
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {question.type.replace('_', ' ')}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-medium text-blue-300">{question.stack}</span>
                                    <div className="flex flex-wrap gap-1">
                                        {question.technologies?.slice(0, 3).map(tech => (
                                            <span key={tech} className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-xs">{question.level}</span>
                                    <span className={`text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>{question.difficulty}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(question.status)}`}>
                                    {question.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Link
                                        href={`/admin/question-bank/${question.id}`}
                                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                        title="View Details"
                                    >
                                        <Eye size={16} />
                                    </Link>
                                    <Link
                                        href={`/admin/question-bank/${question.id}/edit`}
                                        className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </Link>
                                    {question.status !== QuestionStatus.ARCHIVED && (
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to archive this question?')) {
                                                    onArchive(question.id);
                                                }
                                            }}
                                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
};

export default QuestionListTable;
