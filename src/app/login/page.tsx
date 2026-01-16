'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { loginSchema, LoginFormValues } from '@/modules/auth/validation';
import { useLogin } from '@/modules/auth/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * UC-02: User Login Page
 * Premium design with glassmorphism and full logic integration.
 */
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useLogin();
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setServerError(null);
        try {
            await login({
                email: data.email,
                password: data.password,
            });
            // Redirect on success
            router.push('/dashboard');
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

            <main className="relative z-10 w-full max-w-md px-6">
                <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20">
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
                            INTERVIEW FLOW
                        </h1>
                        <p className="text-sm text-gray-400">Master your next interview.</p>
                    </div>

                    {serverError && (
                        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between px-1">
                            <label className="flex cursor-pointer items-center space-x-2 group/check">
                                <div className="relative flex h-5 w-5 items-center justify-center">
                                    <input
                                        {...register('rememberMe')}
                                        type="checkbox"
                                        className="peer h-full w-full appearance-none rounded-md border border-white/10 bg-white/5 transition-all checked:border-cyan-500 checked:bg-cyan-500"
                                    />
                                    <svg
                                        className="pointer-events-none absolute h-3.5 w-3.5 text-black opacity-0 transition-opacity peer-checked:opacity-100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-400 transition-colors group-hover/check:text-gray-300">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-cyan-400 transition-all hover:text-cyan-300 hover:underline underline-offset-4">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative w-full overflow-hidden rounded-2xl bg-cyan-500 py-3.5 font-bold text-black transition-all hover:bg-cyan-400 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Verifying...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </span>
                            <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        </button>

                        {/* Footer */}
                        <p className="mt-8 text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-semibold text-white hover:text-cyan-400 transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}
