import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { fieldsController } from './fields.controller';

const router = Router();

router.get('/', fieldsController.list);
router.post('/', requireAuth, fieldsController.create);
router.patch('/:id', requireAuth, fieldsController.update);
router.delete('/:id', requireAuth, fieldsController.delete);

export { router as fieldsRouter };
