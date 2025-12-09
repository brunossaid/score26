import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('invalid email address'),
  password: z.string().min(4, 'password must be at least 4 characters'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(4, 'current password must be at least 4 characters'),
  newPassword: z.string().min(4, 'new password must be at least 4 characters'),
});
