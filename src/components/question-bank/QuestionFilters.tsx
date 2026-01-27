import React from 'react';
import {
    QUESTION_DIFFICULTIES,
    QUESTION_LEVELS,
    QUESTION_TYPES,
} from '@/modules/question-bank/constants';
import { QuestionListParams } from '@/modules/question-bank/types';

interface QuestionFiltersProps {
    params: QuestionListParams;
    onChange: (newParams: QuestionListParams) => void;
}

const QuestionFilters: React.FC<QuestionFiltersProps> = ({ params, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({ ...params, [name]: value, page: 1 }); // Reset to page 1 on filter change
    };

    return (
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg">
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Search</label>
                <input
                    type="text"
                    name="keyword"
                    placeholder="Search by title..."
                    // value={params.keyword || ''} // Uncontrolled or controlled? Controlled.
                    // Actually, for search, debounce is better, but for now simple input.
                    defaultValue={params.keyword || ''}
                    onBlur={handleChange} // Trigger on blur to avoid too many requests? or onChange?
                    // Using onBlur or onKeyDown Enter is better for text input without debounce.
                    // Let's use onBlur for now or basic onChange.
                    // If I use onChange without debounce, it will trigger API on every keystroke if parent fetches on param change.
                    // The hook useQuestionList doesn't auto-fetch on state change unless we added useEffect.
                    // But I removed the auto-fetch on params change in hook, or rather I put params as dependency for fetchQuestions but exposed params setter?
                    // Actually my hook implementation: `useEffect(() => { fetchQuestions(); }, []);`.
                    // So changing params local state won't trigger fetch unless we call fetchQuestions.
                    // But wait, `useQuestionList` has `params` state.
                    // I should actually control the params from the Page component usually.
                    // Let's assume the parent Page controls the params and passes `onChange` which updates state and calls fetch.
                    // I'll stick to simple onChange for selects, and onBlur/Enter for input.
                    className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Type</label>
                <select
                    name="type"
                    value={params.type || ''}
                    onChange={handleChange}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <option value="">All Types</option>
                    {QUESTION_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Level</label>
                <select
                    name="level"
                    value={params.level || ''}
                    onChange={handleChange}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <option value="">All Levels</option>
                    {QUESTION_LEVELS.map((level) => (
                        <option key={level.value} value={level.value}>
                            {level.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Difficulty</label>
                <select
                    name="difficulty"
                    value={params.difficulty || ''}
                    onChange={handleChange}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <option value="">All Difficulties</option>
                    {QUESTION_DIFFICULTIES.map((diff) => (
                        <option key={diff.value} value={diff.value}>
                            {diff.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Status</label>
                <select
                    name="status"
                    value={params.status || ''}
                    onChange={handleChange}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>
            </div>
        </div>
    );
};

export default QuestionFilters;
