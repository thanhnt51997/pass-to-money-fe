import React, { useState } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import { CreateQuestionRequest } from '@/modules/question-bank/types';

interface ImportQuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImport: (questions: any[]) => Promise<any>;
}

const ImportQuestionModal: React.FC<ImportQuestionModalProps> = ({ isOpen, onClose, onImport }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleImport = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            let parsed;
            try {
                parsed = JSON.parse(jsonInput);
            } catch (e) {
                throw new Error('Invalid JSON format');
            }

            if (!Array.isArray(parsed) && !parsed.questions) {
                // If it's a single object, wrap it? Or expect array.
                // API expects { questions: [] } or maybe just [].
                // My api.bulkImportQuestions wraps it in { questions: ... } if I pass array.
                // So if user pastes [], I should pass it.
                // If user pastes { questions: [] }, I need to extract it.
                throw new Error('Input must be a JSON array of questions or an object with "questions" array.');
            }

            const questionsToImport = parsed.questions || parsed;

            if (!Array.isArray(questionsToImport)) {
                throw new Error('Questions data must be an array.');
            }

            const res = await onImport(questionsToImport);
            setResult(res);
            // Don't close immediately so they can see result
        } catch (err: any) {
            setError(err.message || 'Import failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0f1117] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Upload size={24} className="text-blue-400" />
                        Import Questions
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    {!result ? (
                        <div className="space-y-4">
                            <p className="text-sm text-slate-400">
                                Paste your JSON array of questions here. Ensure it matches the <code>CreateQuestionRequest</code> structure.
                            </p>
                            <textarea
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                placeholder={'[\n  {\n    "title": "Example Question",\n    "content": "...",\n    "type": "theoretical",\n    "stack": "Backend",\n    "level": "Junior",\n    "difficulty": "Easy"\n  }\n]'}
                                className="w-full h-64 bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-2">
                                    <AlertCircle size={20} />
                                    {error}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6 text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
                                <Check size={32} />
                            </div>
                            <h4 className="text-2xl font-bold text-white">Import Completed</h4>
                            <p className="text-slate-400">
                                Successfully processed {result.data?.total || 0} items.
                                <br />
                                Success: <span className="text-green-400">{result.data?.success || 0}</span> |
                                Errors: <span className="text-red-400">{result.data?.errors?.length || 0}</span>
                            </p>
                            {result.data?.errors?.length > 0 && (
                                <div className="bg-slate-900 p-4 rounded-md text-left text-xs font-mono text-red-300 max-h-40 overflow-auto">
                                    {JSON.stringify(result.data.errors, null, 2)}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-white/5 bg-white/5 flex justify-end gap-3">
                    {!result ? (
                        <>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={loading || !jsonInput.trim()}
                                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                            >
                                {loading ? 'Importing...' : 'Import Questions'}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium shadow-lg transition-all"
                        >
                            Done
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImportQuestionModal;
