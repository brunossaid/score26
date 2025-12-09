import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { matchTypesController } from './matchTypes.controller';

const router = Router();

router.get('/', matchTypesController.list);
router.post('/', requireAuth, matchTypesController.create);
router.patch('/:id', requireAuth, matchTypesController.update);
router.delete('/:id', requireAuth, matchTypesController.delete);

export { router as matchTypesRouter };
