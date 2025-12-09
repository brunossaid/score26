import { prisma } from '../../../infrastructure/prisma/client';
import {
  createUserSchema,
  updateUserSchema,
  changePasswordSchema,
} from './users.validations';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

export const usersController = {
  create: async (req: Request, res: Response) => {
    try {
      const data = createUserSchema.parse(req.body);

      const existing = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existing) {
        return res.status(409).json({ message: 'email already in use' });
      }

      const passwordHash = bcrypt.hashSync(data.password, 10);

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
        },
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'invalid id' });
      }

      const data = updateUserSchema.parse(req.body);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'no fields to update' });
      }

      const existing = await prisma.user.findUnique({ where: { id } });

      if (!existing) {
        return res.status(404).json({ message: 'user not found' });
      }

      const updated = await prisma.user.update({
        where: { id },
        data,
      });

      return res.json({
        id: updated.id,
        name: updated.name,
        email: updated.email,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  changePassword: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'invalid id' });
      }

      const data = changePasswordSchema.parse(req.body);

      const existing = await prisma.user.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ message: 'user not found' });
      }

      const isCorrect = await bcrypt.compare(
        data.oldPassword,
        existing.passwordHash
      );

      if (!isCorrect) {
        return res.status(401).json({ message: 'incorrect current password' });
      }

      const newHash = await bcrypt.hash(data.newPassword, 10);

      await prisma.user.update({
        where: { id },
        data: { passwordHash: newHash },
      });

      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};
