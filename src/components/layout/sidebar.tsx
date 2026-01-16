'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Mic2,
    History,
    Settings,
    LogOut,
    ChevronRight,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/modules/auth/auth.store';
import Cookies from 'js-cookie';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FileText, label: 'Essay Practice', href: '/essay' },
    { icon: Mic2, label: 'Voice Practice', href: '/voice' },
    { icon: History, label: 'History', href: '/history' },
];

const secondaryItems = [
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        Cookies.remove('auth_token');
        router.push('/login');
    };

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-white/10 bg-[#050505] p-6 transition-all duration-300">
            {/* Logo */}
            <div className="mb-10 flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/20">
                    <span className="text-xl font-black text-black">P</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                    PASS<span className="text-cyan-400">MONEY</span>
                </h1>
            </div>

            {/* Search Bar - Aesthetic addition */}
            <div className="relative mb-8 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-cyan-400" size={18} />
                <input
                    type="text"
                    placeholder="Search practice..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-all focus:border-cyan-500/30 focus:bg-white/[0.07]"
                />
            </div>

            {/* Navigation */}
            <nav className="space-y-8">
                <div>
                    <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">Main Menu</p>
                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} className={cn(
                                            "transition-colors",
                                            isActive ? "text-cyan-400" : "group-hover:text-white"
                                        )} />
                                        <span>{item.label}</span>
                                    </div>
                                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">Support</p>
                    <div className="space-y-1">
                        {secondaryItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
                            >
                                <item.icon size={20} className="group-hover:text-white" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Bottom Section - Logout */}
            <div className="absolute bottom-6 left-6 right-6">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-400"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
