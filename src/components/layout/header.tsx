'use client';

import React from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/modules/auth/auth.store';

export function Header() {
    const { user } = useAuthStore();

    return (
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-white/10 bg-[#050505]/80 px-8 backdrop-blur-xl">
            {/* Left side: Welcome message */}
            <div>
                <h2 className="text-lg font-semibold text-white">Welcome back, {user?.name || 'Guest'}!</h2>
                <p className="text-sm text-gray-500">Here's what's happening today.</p>
            </div>

            {/* Right side: Actions & User Profile */}
            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white">
                    <Bell size={20} />
                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
                </button>

                {/* Vertical Divider */}
                <div className="h-8 w-px bg-white/10" />

                {/* User Profile */}
                <button className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-1.5 pr-4 transition-all hover:border-white/20 hover:bg-white/[0.07]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 text-cyan-400 ring-1 ring-cyan-500/20 transition-all group-hover:ring-cyan-500/40">
                        <User size={18} />
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-bold text-white">{user?.name || 'Loading...'}</p>
                        <p className="text-[10px] text-gray-500 capitalize">{user?.role?.toLowerCase() || 'Member'}</p>
                    </div>
                    <ChevronDown size={14} className="text-gray-500 transition-transform group-hover:rotate-180" />
                </button>
            </div>
        </header>
    );
}
