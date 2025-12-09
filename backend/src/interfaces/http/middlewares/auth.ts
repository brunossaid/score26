import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'missing Authorization header' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'invalid Authorization header format' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined');
    return res.status(500).json({ message: 'internal server error' });
  }

  try {
    const payload = jwt.verify(token, secret) as { sub: string };

    // guardamos el userId en req para usarlo despues
    req.userId = payload.sub;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'invalid or expired token' });
  }
}
