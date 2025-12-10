import { Request, Response } from 'express';
import { prisma } from '../../../infrastructure/prisma/client';
import {
  createMatchSchema,
  updateMatchSchema,
  listMatchesQuerySchema,
} from './matches.validations';

export const matchesController = {
  list: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const query = listMatchesQuerySchema.parse(req.query);

      const where: any = { userId };

      if (query.fieldId !== undefined) {
        where.fieldId = query.fieldId;
      }

      if (query.matchTypeId !== undefined) {
        where.matchTypeId = query.matchTypeId;
      }

      if (query.fromDate || query.toDate) {
        where.date = {};
        if (query.fromDate) where.date.gte = new Date(query.fromDate);
        if (query.toDate) where.date.lte = new Date(query.toDate);
      }

      const orderByField = query.orderBy || 'date';
      const orderByDirection = query.orderDir || 'desc';

      const matches = await prisma.match.findMany({
        where,
        orderBy: { [orderByField]: orderByDirection },
        include: {
          field: true,
          matchType: true,
        },
      });

      return res.json(matches);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const data = createMatchSchema.parse(req.body);

      const [field, matchType] = await Promise.all([
        prisma.field.findUnique({ where: { id: data.fieldId } }),
        prisma.matchType.findUnique({ where: { id: data.matchTypeId } }),
      ]);

      if (!field) return res.status(404).json({ message: 'field not found' });
      if (!matchType)
        return res.status(404).json({ message: 'match type not found' });

      const parsedDate = new Date(data.date);

      const match = await prisma.match.create({
        data: {
          userId,
          date: parsedDate,
          fieldId: data.fieldId,
          matchTypeId: data.matchTypeId,
          result: data.result,
          rating: data.rating,
          goals: data.goals,
          cost: data.cost,
        },
        include: {
          field: true,
          matchType: true,
        },
      });

      return res.status(201).json(match);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const userId = (req as any).userId;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'invalid id' });
    }

    const match = await prisma.match.findFirst({
      where: { id, userId },
    });

    if (!match) {
      return res.status(404).json({ message: 'match not found' });
    }

    await prisma.match.delete({ where: { id } });

    return res.status(204).send();
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const userId = (req as any).userId;

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: 'invalid id' });
      }

      const existing = await prisma.match.findFirst({ where: { id, userId } });

      if (!existing) {
        return res.status(404).json({ message: 'match not found' });
      }

      const data = updateMatchSchema.parse(req.body);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'no fields to update' });
      }

      const updates: any = {};

      if (data.date !== undefined) {
        updates.date = new Date(data.date);
      }

      if (data.fieldId !== undefined) {
        const field = await prisma.field.findUnique({
          where: { id: data.fieldId },
        });
        if (!field) return res.status(404).json({ message: 'field not found' });

        updates.fieldId = data.fieldId;
      }

      if (data.matchTypeId !== undefined) {
        const type = await prisma.matchType.findUnique({
          where: { id: data.matchTypeId },
        });
        if (!type)
          return res.status(404).json({ message: 'match type not found' });

        updates.matchTypeId = data.matchTypeId;
      }

      if (data.result !== undefined) {
        updates.result = data.result;
      }

      if (data.rating !== undefined) {
        updates.rating = data.rating;
      }

      if (data.goals !== undefined) {
        updates.goals = data.goals;
      }

      if (data.cost !== undefined) {
        updates.cost = data.cost;
      }

      const updated = await prisma.match.update({
        where: { id },
        data: updates,
        include: {
          field: true,
          matchType: true,
        },
      });

      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};
