import { Router } from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', CategoryController.GetAllCategories);
router.get('/:id', CategoryController.GetCategoryById);
router.post('/', auth(Role.ADMIN), CategoryController.CreateCategory);
router.patch('/:id', auth(Role.ADMIN), CategoryController.UpdateCategory);
router.delete('/:id', auth(Role.ADMIN), CategoryController.DeleteCategory);

export const categoryRouter = router;
