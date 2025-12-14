import { z } from 'zod';

export type AuthForm = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(2, 'Name is too short'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
    confirmPassword: z
      .string()
      .min(4, 'Password must be at least 4 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
