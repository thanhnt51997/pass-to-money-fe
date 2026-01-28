'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProfile } from '@/modules/user/hooks';
import { useAuth } from '@/modules/auth/hooks';
import { Loader2, Save, User as UserIcon } from 'lucide-react';

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
    const { profile, loading, updateProfile } = useProfile();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema)
    });

    // Populate form when profile data loads
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

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            await updateProfile({
                ...data,
                // Ensure empty strings are handled if needed, z.literal('') handles it
            });
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
        </div>
    );
}
