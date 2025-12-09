import { Router } from 'express';
import { authController } from './auth.controller';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/login', authController.login);
router.get('/me', requireAuth, authController.me);

export { router as authRouter };
