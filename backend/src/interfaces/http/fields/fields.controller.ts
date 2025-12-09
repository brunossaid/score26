import { prisma } from '../../../infrastructure/prisma/client';
import { createFieldSchema, updateFieldSchema } from './fields.validations';
import { Request, Response } from 'express';

export const fieldsController = {
  list: async (req: Request, res: Response) => {
    const fields = await prisma.field.findMany({
      orderBy: { name: 'asc' },
    });

    return res.json(fields);
  },

  create: async (req: Request, res: Response) => {
    try {
      const data = createFieldSchema.parse(req.body);

      const existing = await prisma.field.findUnique({
        where: { name: data.name },
      });

      if (existing) {
        return res.status(409).json({ message: 'field already exists' });
      }

      const field = await prisma.field.create({ data });

      return res.status(201).json(field);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: 'invalid id' });
      }

      const data = updateFieldSchema.parse(req.body);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'no fields to update' });
      }

      const existing = await prisma.field.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ message: 'field not found' });
      }

      if (data.name) {
        const duplicated = await prisma.field.findUnique({
          where: { name: data.name },
        });

        if (duplicated && duplicated.id !== id) {
          return res.status(409).json({ message: 'field name already in use' });
        }
      }

      const updated = await prisma.field.update({
        where: { id },
        data,
      });

      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'invalid id' });
    }

    const existing = await prisma.field.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'field not found' });
    }

    await prisma.field.delete({ where: { id } });

    return res.status(204).send();
  },
};
