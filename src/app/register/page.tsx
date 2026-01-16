'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import { registerSchema, RegisterFormValues } from '@/modules/auth/validation';
import { useRegister } from '@/modules/auth/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * UC-01: User Registration Page
 * Premium design with glassmorphism and full logic integration.
 */
export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register: registerUser } = useRegister();
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setServerError(null);
        try {
            await registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            // Redirect on success
            router.push('/');
        } catch (error: any) {
            setServerError(error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] font-sans selection:bg-cyan-500/30" suppressHydrationWarning>
            {/* Dynamic Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-cyan-600/20 blur-[120px]" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

            <main className="relative z-10 w-full max-w-md px-6 my-12">
                <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20">

                    {/* Back to Login */}
                    <Link
                        href="/login"
                        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
                            CREATE ACCOUNT
                        </h1>
                        <p className="text-sm text-gray-400">Start your interview journey today.</p>
                    </div>

                    {serverError && (
                        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Full Name Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                            <div className="relative group/input">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-cyan-400">
                                    <User size={18} />
                                </span>
                                <input
                                    {...register('name')}
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-400 ml-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                            <div className="relative group/input">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-cyan-400">
                                    <Mail size={18} />
                                </span>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-400 ml-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                            <div className="relative group/input">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-cyan-400">
                                    <Lock size={18} />
                                </span>
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-12 text-white placeholder:text-gray-600 outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-400 ml-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Confirm Password</label>
                            <div className="relative group/input">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-cyan-400">
                                    <Lock size={18} />
                                </span>
                                <input
                                    {...register('confirmPassword')}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-12 text-white placeholder:text-gray-600 outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-400 ml-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative w-full overflow-hidden rounded-2xl bg-cyan-500 py-4 font-bold text-black transition-all hover:bg-cyan-400 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Creating...
                                    </>
                                ) : (
                                    'Register'
                                )}
                            </span>
                            <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        </button>

                        {/* Footer */}
                        <p className="mt-8 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-white hover:text-cyan-400 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}
