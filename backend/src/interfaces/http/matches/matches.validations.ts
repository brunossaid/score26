import { z } from 'zod';

export const allowedResults = ['WIN', 'DRAW', 'LOSS'] as const;

export const createMatchSchema = z.object({
  date: z.string().datetime({ message: 'invalid date format' }),
  fieldId: z.number().int().positive(),
  matchTypeId: z.number().int().positive(),
  result: z.enum(allowedResults, { message: 'invalid result' }),
  rating: z.number().int().min(1).max(10),
  goals: z.number().int().min(0),
  cost: z.number().min(0),
});

export const updateMatchSchema = z.object({
  date: z.string().datetime().optional(),
  fieldId: z.number().int().positive().optional(),
  matchTypeId: z.number().int().positive().optional(),
  result: z.enum(allowedResults).optional(),
  rating: z.number().int().min(1).max(10).optional(),
  goals: z.number().int().min(0).optional(),
  cost: z.number().min(0).optional(),
});
