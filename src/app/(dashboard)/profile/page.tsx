'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProfile, useSkillBreakdown } from '@/modules/user/hooks';
import { useAuth } from '@/modules/auth/hooks';
import { Loader2, Save, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    target_level: z.enum(['JUNIOR', 'MIDDLE', 'SENIOR', 'LEAD']).optional(),
    preferred_stack: z.enum(['FRONTEND', 'BACKEND', 'FULLSTACK', 'MOBILE', 'DEVOPS']).optional(),
    bio: z.string().optional(),
    linkedin_url: z.string().url().optional().or(z.literal('')),
    github_url: z.string().url().optional().or(z.literal(''))
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const { user } = useAuth();
    const { profile, loading, updateGoal, updateUserInfo } = useProfile();
    const { data: skills, loading: skillsLoading } = useSkillBreakdown();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema)
    });

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name,
                target_level: profile.target_level,
                preferred_stack: profile.preferred_stack,
                bio: profile.bio || '',
                linkedin_url: profile.linkedin_url || '',
                github_url: profile.github_url || ''
            });
        }
    }, [profile, reset]);

    const onSubmit = async (values: ProfileFormValues) => {
        try {
            await Promise.all([
                updateGoal({
                    target_level: values.target_level,
                    preferred_stack: values.preferred_stack,
                }),
                updateUserInfo({
                    name: values.name,
                    bio: values.bio,
                    linkedin_url: values.linkedin_url,
                    github_url: values.github_url,
                }),
            ]);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile.');
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="animate-spin text-cyan-500" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                My Profile
            </h1>

            <div className="bg-[#09090b] border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/20">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <UserIcon size={40} />
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{user?.email}</h2>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-400">
                            {user?.role}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Full Name</label>
                            <input
                                {...register('name')}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-500/50 outline-none transition-colors"
                            />
                            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Target Level</label>
                            <select
                                {...register('target_level')}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-500/50 outline-none transition-colors"
                            >
                                <option value="">Select Level</option>
                                <option value="JUNIOR">Junior</option>
                                <option value="MIDDLE">Middle</option>
                                <option value="SENIOR">Senior</option>
                                <option value="LEAD">Lead</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Preferred Stack</label>
                            <select
                                {...register('preferred_stack')}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-500/50 outline-none transition-colors"
                            >
                                <option value="">Select Stack</option>
                                <option value="FRONTEND">Frontend</option>
                                <option value="BACKEND">Backend</option>
                                <option value="FULLSTACK">Fullstack</option>
                                <option value="MOBILE">Mobile</option>
                                <option value="DEVOPS">DevOps</option>
                            </select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-400">Bio</label>
                            <textarea
                                {...register('bio')}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-500/50 outline-none transition-colors"
                                placeholder="Tell us about your goals..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">LinkedIn URL</label>
                            <input
                                {...register('linkedin_url')}
                                type="url"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-500/50 outline-none transition-colors"
                                placeholder="https://linkedin.com/in/..."
                            />
                            {errors.linkedin_url && <p className="text-red-400 text-xs">{errors.linkedin_url.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">GitHub URL</label>
                            <input
                                {...register('github_url')}
                                type="url"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-500/50 outline-none transition-colors"
                                placeholder="https://github.com/..."
                            />
                            {errors.github_url && <p className="text-red-400 text-xs">{errors.github_url.message}</p>}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-cyan-400 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Skill Breakdown — read-only */}
            <div className="bg-[#09090b] border border-white/10 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Skill Breakdown</h2>
                {skillsLoading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="animate-spin text-cyan-500" size={24} />
                    </div>
                ) : skills.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No skill data yet. Complete some interviews to see your breakdown.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                                <tr>
                                    <th className="pb-3 pr-6 font-medium">Stack</th>
                                    <th className="pb-3 pr-6 font-medium">Sessions</th>
                                    <th className="pb-3 pr-6 font-medium">Avg Score</th>
                                    <th className="pb-3 font-medium">Last Practice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {skills.map((s) => (
                                    <tr key={s.stack} className="text-sm">
                                        <td className="py-3 pr-6 font-medium text-white">{s.stack}</td>
                                        <td className="py-3 pr-6 text-gray-400">{s.interview_count}</td>
                                        <td className="py-3 pr-6">
                                            <span className={`font-bold ${s.avg_score >= 8 ? 'text-green-400' : s.avg_score >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                {s.avg_score.toFixed(1)}
                                            </span>
                                        </td>
                                        <td className="py-3 text-gray-400">
                                            {format(new Date(s.last_interview_at), 'MMM d, yyyy')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
