import { prisma } from '../../../infrastructure/prisma/client';
import {
  createMatchTypeSchema,
  updateMatchTypeSchema,
} from './matchTypes.validations';
import { Request, Response } from 'express';

export const matchTypesController = {
  list: async (req: Request, res: Response) => {
    const matchTypes = await prisma.matchType.findMany({
      orderBy: { name: 'asc' },
    });

    return res.json(matchTypes);
  },

  create: async (req: Request, res: Response) => {
    try {
      const data = createMatchTypeSchema.parse(req.body);

      const existing = await prisma.matchType.findUnique({
        where: { name: data.name },
      });

      if (existing) {
        return res.status(409).json({ message: 'match type already exists' });
      }

      const matchType = await prisma.matchType.create({ data });

      return res.status(201).json(matchType);
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

      const data = updateMatchTypeSchema.parse(req.body);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'no fields to update' });
      }

      const existing = await prisma.matchType.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ message: 'match type not found' });
      }

      if (data.name) {
        const duplicated = await prisma.matchType.findUnique({
          where: { name: data.name },
        });

        if (duplicated && duplicated.id !== id) {
          return res
            .status(409)
            .json({ message: 'match type name already in use' });
        }
      }

      const updated = await prisma.matchType.update({
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

    const existing = await prisma.matchType.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'match type not found' });
    }

    await prisma.matchType.delete({ where: { id } });

    return res.status(204).send();
  },
};
