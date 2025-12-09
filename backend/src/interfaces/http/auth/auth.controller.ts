import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../infrastructure/prisma/client';
import { loginSchema } from './auth.validations';

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);

      if (!isValid) {
        return res.status(401).json({ message: 'invalid credentials' });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error('JWT_SECRET is not defined');
        return res.status(500).json({ message: 'internal server error' });
      }

      const token = jwt.sign(
        {
          sub: user.id,
          email: user.email,
          name: user.name,
        },
        secret,
        { expiresIn: '7d' }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  me: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId as string | undefined;

      if (!userId) {
        return res.status(401).json({ message: 'unauthorized' });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (error) {
      return res.status(500).json({ message: 'internal server error' });
    }
  },
};
