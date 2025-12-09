import { z } from 'zod';

export const createMatchTypeSchema = z.object({
  name: z.string().min(1, 'name is required'),
});

export const updateMatchTypeSchema = z.object({
  name: z.string().min(1).optional(),
});
