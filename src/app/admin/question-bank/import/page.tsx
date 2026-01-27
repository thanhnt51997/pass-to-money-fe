'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useImportQuestions } from '@/modules/question-bank/hooks';
import ImportQuestionModal from '@/components/question-bank/ImportQuestionModal';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ImportPage() {
    const router = useRouter();
    const { importQuestions } = useImportQuestions();
    // Since I extracted ImportModal, I can just use it here or render it inline.
    // The Modal was designed as a modal but here it's a page.
    // I will just use the Modal component but make it always visible or trigger it?
    // Actually, making a page that just opens a modal is weird.
    // I should probably just render the content of the modal directly or Wrap it.
    // Let's wrapping it: "Click here to open import"
    // OR better, I'll refactor ImportQuestionModal to be more flexible, or just use it as is.
    // I'll assume users want to click a button to start import, but this IS the import page.
    // So the modal should be open by default?
    // Actually, I'll allow the user to see instructions and then Open the modal, OR I will rewrite the page to be a full page import.
    // Re-using the logic from Modal is good.
    // Let's validly straightforwardly: The page has a big button "Start Import" that opens the modal.

    const [isModalOpen, setIsModalOpen] = React.useState(true); // Open by default

    const handleClose = () => {
        setIsModalOpen(false);
        router.push('/admin/question-bank');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link
                    href="/admin/question-bank"
                    className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to List
                </Link>
                <h1 className="text-3xl font-bold text-white">Bulk Import Questions</h1>
                <p className="text-slate-400 mt-2">Import multiple questions using JSON.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-2xl">
                <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
                <ul className="list-disc list-inside text-slate-300 space-y-2 mb-8">
                    <li>Prepare your questions in JSON format.</li>
                    <li>Ensure all required fields (title, content, type, etc.) are present.</li>
                    <li>Use the modal to paste your JSON and validate before importing.</li>
                </ul>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                >
                    Open Import Tool
                </button>
            </div>

            <ImportQuestionModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onImport={(data) => importQuestions(data as any)}
            />
        </div>
    );
}
