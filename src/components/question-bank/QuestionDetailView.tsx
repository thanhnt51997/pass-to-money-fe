import React from 'react';
import { Question, QuestionStatus } from '@/modules/question-bank/types';
import Link from 'next/link';
import { ArrowLeft, Calendar, Edit2, Layers, Tag } from 'lucide-react';

interface QuestionDetailViewProps {
    question: Question;
}

const QuestionDetailView: React.FC<QuestionDetailViewProps> = ({ question }) => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <Link
                        href="/admin/question-bank"
                        className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-2"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to List
                    </Link>
                    <h1 className="text-3xl font-bold text-white leading-tight">{question.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(question.created_at).toLocaleDateString()}
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-slate-700 text-slate-400 text-xs">
                            ID: {question.id}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase
              ${question.status === QuestionStatus.ACTIVE ? 'bg-green-500/20 text-green-400' :
                                question.status === QuestionStatus.DRAFT ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-slate-500/20 text-slate-400'}`}
                        >
                            {question.status}
                        </span>
                    </div>
                </div>
                <Link
                    href={`/admin/question-bank/${question.id}/edit`}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Edit2 size={16} />
                    Edit
                </Link>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Type', value: question.type, color: 'blue' },
                    { label: 'Stack', value: question.stack, color: 'purple' },
                    { label: 'Level', value: question.level, color: 'orange' },
                    {
                        label: 'Difficulty', value: question.difficulty, color:
                            question.difficulty === 'Hard' ? 'red' :
                                question.difficulty === 'Medium' ? 'yellow' : 'green'
                    },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                        <p className={`text-lg font-semibold text-${item.color}-400 capitalize`}>
                            {item.value?.replace('_', ' ') || 'N/A'}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Question Content */}
                    <section className="bg-white/5 border border-white/10 rounded-xl p-8 shadow-xl">
                        <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Question Content</h2>
                        <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap font-sans">
                            {question.content}
                        </div>
                    </section>

                    {/* Expected Answer */}
                    {question.expected_answer && (
                        <section className="bg-white/5 border border-white/10 rounded-xl p-8 shadow-xl">
                            <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2 text-green-400">Expected Answer</h2>
                            <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap font-sans">
                                {question.expected_answer}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Technologies & Tags */}
                    <section className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Layers size={16} /> Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {question.technologies?.length > 0 ? question.technologies.map((tech) => (
                                <span key={tech} className="px-3 py-1 rounded-md bg-purple-500/20 text-purple-300 text-sm">
                                    {tech}
                                </span>
                            )) : <span className="text-slate-500 text-sm">No technologies specified.</span>}
                        </div>

                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Tag size={16} /> Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {question.tags?.length > 0 ? question.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-md bg-slate-700/50 text-slate-300 text-sm">
                                    #{tag}
                                </span>
                            )) : <span className="text-slate-500 text-sm">No tags.</span>}
                        </div>
                    </section>

                    {/* Evaluation Criteria */}
                    {question.evaluation_criteria && (
                        <section className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 text-cyan-400">
                                Evaluation Criteria
                            </h3>
                            <div className="text-sm text-slate-300 whitespace-pre-wrap">
                                {question.evaluation_criteria}
                            </div>
                        </section>
                    )}

                    {/* System Info */}
                    <section className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl">
                        <div className="space-y-3 text-xs text-slate-500">
                            <p>Created At: {new Date(question.created_at).toLocaleString()}</p>
                            <p>Updated At: {new Date(question.updated_at).toLocaleString()}</p>
                            {question.created_by && <p>Created By User ID: {question.created_by}</p>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetailView;
