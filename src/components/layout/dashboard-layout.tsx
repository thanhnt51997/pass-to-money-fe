'use client';

import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Sidebar */}
            <Sidebar />

            /* Main Content Area */
            <div className="flex flex-col pl-72">
                {/* Header */}
                <Header />

                {/* Content */}
                <main className="relative p-8">
                    {/* Background Glows for content area */}
                    <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

                    {children}
                </main>
            </div>
        </div>
    );
}
