import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { questionSchema, QuestionFormValues } from '@/modules/question-bank/validation';
import {
    QUESTION_DIFFICULTIES,
    QUESTION_LEVELS,
    QUESTION_TYPES,
} from '@/modules/question-bank/constants';
import { Question, QuestionStatus, QuestionType } from '@/modules/question-bank/types';
import { Plus, X, Save, Loader2 } from 'lucide-react';

interface QuestionFormProps {
    initialData?: Question;
    onSubmit: (data: QuestionFormValues) => Promise<void>;
    loading: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ initialData, onSubmit, loading }) => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<QuestionFormValues>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            title: initialData?.title || '',
            content: initialData?.content || '',
            type: initialData?.type || QuestionType.THEORETICAL,
            stack: initialData?.stack || '',
            technologies: initialData?.technologies || [],
            level: initialData?.level || undefined,
            difficulty: initialData?.difficulty || undefined,
            expected_answer: initialData?.expected_answer || '',
            evaluation_criteria: initialData?.evaluation_criteria || '',
            tags: initialData?.tags || [],
            status: initialData?.status || QuestionStatus.DRAFT,
        },
    });

    // Dynamic tags handling
    // Since we don't have a complex tag input component, we'll use a simple comma-separated input or a field array.
    // Let's use a simple text input for "Add tag" + list of tags.
    // Actually, field array is better for "technologies" and "tags".
    // Let's implement a simple multi-value input helper or just standard inputs.
    // For simplicity and speed, let's use comma separated for now? No, user wants premium.
    // I will make a custom tag input UI inside this form.

    const [tagInput, setTagInput] = React.useState('');
    const [techInput, setTechInput] = React.useState('');

    const currentTags = watch('tags') || [];
    const currentTechs = watch('technologies') || [];

    const addTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!currentTags.includes(tagInput.trim())) {
                setValue('tags', [...currentTags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setValue('tags', currentTags.filter((t) => t !== tag));
    };

    const addTech = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            if (!currentTechs.includes(techInput.trim())) {
                setValue('technologies', [...currentTechs, techInput.trim()]);
            }
            setTechInput('');
        }
    };

    const removeTech = (tech: string) => {
        setValue('technologies', currentTechs.filter((t) => t !== tech));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* General Information Section */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    General Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                        <input
                            {...register('title')}
                            placeholder="e.g. Explain Laravel Service Container"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-1">Question Content</label>
                        <textarea
                            {...register('content')}
                            rows={5}
                            placeholder="Full question content (Markdown supported)..."
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
                        />
                        {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Type</label>
                        <select
                            {...register('type')}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        >
                            {QUESTION_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                        {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                        <select
                            {...register('status')}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        >
                            <option value="draft">Draft</option>
                            <option value="active">Active</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Categorization Section */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                    Categorization
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Stack (Domain)</label>
                        <input
                            {...register('stack')}
                            placeholder="e.g. Backend, Frontend, DevOps"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        />
                        {errors.stack && <p className="text-red-400 text-xs mt-1">{errors.stack.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Technologies</label>
                        <div className="flex flex-wrap items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 min-h-[46px] focus-within:ring-2 focus-within:ring-purple-500/50 transition-all">
                            {currentTechs.map((tech) => (
                                <span key={tech} className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-md">
                                    {tech}
                                    <button type="button" onClick={() => removeTech(tech)} className="hover:text-white"><X size={12} /></button>
                                </span>
                            ))}
                            <input
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={addTech}
                                placeholder="Type & Enter..."
                                className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 min-w-[100px] flex-1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Level</label>
                        <select
                            {...register('level')}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        >
                            <option value="">Select Level</option>
                            {QUESTION_LEVELS.map((level) => (
                                <option key={level.value} value={level.value}>
                                    {level.label}
                                </option>
                            ))}
                        </select>
                        {errors.level && <p className="text-red-400 text-xs mt-1">{errors.level.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Difficulty</label>
                        <select
                            {...register('difficulty')}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        >
                            <option value="">Select Difficulty</option>
                            {QUESTION_DIFFICULTIES.map((diff) => (
                                <option key={diff.value} value={diff.value}>
                                    {diff.label}
                                </option>
                            ))}
                        </select>
                        {errors.difficulty && <p className="text-red-400 text-xs mt-1">{errors.difficulty.message}</p>}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-1">Tags</label>
                        <div className="flex flex-wrap items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 min-h-[46px] focus-within:ring-2 focus-within:ring-purple-500/50 transition-all">
                            {currentTags.map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1 bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-md">
                                    {tag}
                                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-white"><X size={12} /></button>
                                </span>
                            ))}
                            <input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={addTag}
                                placeholder="Type & Enter..."
                                className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 min-w-[100px] flex-1"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Evaluation Guidelines */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                    Evaluation Guidelines
                </h3>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Expected Answer (Reference)</label>
                        <textarea
                            {...register('expected_answer')}
                            rows={4}
                            placeholder="Key points or sample answer..."
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Evaluation Criteria & Scoring Rubric</label>
                        <textarea
                            {...register('evaluation_criteria')}
                            rows={4}
                            placeholder="Criteria for AI or manual grading..."
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    <span>{initialData ? 'Update Question' : 'Create Question'}</span>
                </button>
            </div>
        </form>
    );
};

export default QuestionForm;
