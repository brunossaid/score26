import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { matchesController } from './matches.controller';

const router = Router();

router.get('/', requireAuth, matchesController.list);
router.post('/', requireAuth, matchesController.create);
router.patch('/:id', requireAuth, matchesController.update);
router.delete('/:id', requireAuth, matchesController.delete);

export { router as matchesRouter };
