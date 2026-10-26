import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', auth(Role.ADMIN), UserController.GetAllUsers);
router.get('/profile', auth(), UserController.userProfile);
router.post('/admin', auth(Role.ADMIN), UserController.CreateAdminUser);

router
  .route('/:id')
  .get(auth(Role.ADMIN), UserController.GetSingleUser)
  .delete(auth(Role.ADMIN), UserController.DeleteUser);

router.patch('/:id/role', auth(Role.ADMIN), UserController.UpdateUserRole);
router.patch('/:id/toggle-active', auth(Role.ADMIN), UserController.ToggleUserActive);

export const userRouter = router;
