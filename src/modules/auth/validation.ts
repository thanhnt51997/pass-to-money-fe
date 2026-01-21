import { z } from 'zod';

/**
 * Login Validation Schema
 */
export const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Register Validation Schema
 */
export const registerSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(255),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
