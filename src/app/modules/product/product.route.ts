import { Router } from 'express';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', ProductController.GetAllProducts);
router.get('/:id', ProductController.GetProductById);
router.post('/', auth(Role.ADMIN), ProductController.CreateProduct);
router.patch('/:id', auth(Role.ADMIN), ProductController.UpdateProduct);
router.delete('/:id', auth(Role.ADMIN), ProductController.DeleteProduct);

export const productRouter = router;
