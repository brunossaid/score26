import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { usersController } from './users.controller';

const router = Router();

router.post('/', usersController.create);
router.patch('/:id', requireAuth, usersController.update);
router.patch('/:id/password', requireAuth, usersController.changePassword);

export { router as usersRouter };
