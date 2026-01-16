import React from 'react';
import {
    Clock,
    ArrowUpRight,
    Target,
    Zap,
    BookOpen,
    Play
} from 'lucide-react';

/**
 * UC-20: User Dashboard Overview
 * Business Rules:
 * - Display summary stats for user performance
 * - Show recent activities and quick access to practice
 */
export default function DashboardPage() {
    return (
        <div className="space-y-10">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Practices', value: '24', icon: Target, color: 'cyan' },
                    { label: 'Avg. Score', value: '85%', icon: Zap, color: 'purple' },
                    { label: 'Time Spent', value: '12h', icon: Clock, color: 'blue' },
                    { label: 'Success Rate', value: '92%', icon: ArrowUpRight, color: 'emerald' },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <h3 className="mt-1 text-2xl font-bold text-white">{stat.value}</h3>
                            </div>
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400 ring-1 ring-${stat.color}-500/20`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        {/* Progress line */}
                        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
                            <div
                                className={`h-full bg-${stat.color}-500/50 transition-all duration-1000`}
                                style={{ width: '65%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Action Cards */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 p-8">
                        <div className="relative z-10 max-w-lg">
                            <h2 className="text-3xl font-bold text-white">Ready for your next interview?</h2>
                            <p className="mt-2 text-gray-400">Practice with our AI-powered interview simulator and get instant feedback on your performance.</p>
                            <div className="mt-8 flex gap-4">
                                <button className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95">
                                    <Play size={18} fill="black" />
                                    Start Practice
                                </button>
                                <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white transition-all hover:bg-white/10">
                                    View Guide
                                </button>
                            </div>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-cyan-500/10 blur-[60px]" />
                        <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-purple-500/10 blur-[60px]" />
                    </div>

                    {/* Recent sessions */}
                    <div>
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Recent Sessions</h3>
                            <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300">View all</button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-gray-400">
                                            <BookOpen size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Fullstack Developer Interview</h4>
                                            <p className="text-xs text-gray-500">2 days ago • 15 Questions</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-cyan-400">88/100</div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-600">Premium AI Result</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info/Badges */}
                <div className="space-y-8">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                        <h3 className="mb-4 text-lg font-bold text-white">Skills Progress</h3>
                        <div className="space-y-6">
                            {[
                                { name: 'Technical Depth', score: 82 },
                                { name: 'Communication', score: 95 },
                                { name: 'Problem Solving', score: 78 },
                                { name: 'System Design', score: 64 },
                            ].map((skill, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400">{skill.name}</span>
                                        <span className="text-white font-bold">{skill.score}%</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-white/5">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                                            style={{ width: `${skill.score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-white leading-tight">Upgrade to PRO for Unlimited AI Feedback</h3>
                            <button className="mt-6 w-full rounded-xl bg-white py-3 font-bold text-black transition-all hover:bg-gray-200">
                                View Plans
                            </button>
                        </div>
                        <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-50" />
                    </div>
                </div>
            </div>
        </div>
    );
}
