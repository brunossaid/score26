import { z } from "zod";

export const createFieldSchema = z.object({
  name: z.string().min(1, "name is required"),
});

export const updateFieldSchema = z.object({
  name: z.string().min(1).optional(),
});
