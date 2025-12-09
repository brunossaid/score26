import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'invalid email address' }),
  password: z.string().min(4, 'password must be at least 4 characters'),
});
