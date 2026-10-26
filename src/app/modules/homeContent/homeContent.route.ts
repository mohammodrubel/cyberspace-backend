import { Router } from 'express';
import { HomeContentController } from './homeContent.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', HomeContentController.GetAllHomeContent);
router.get('/:key', HomeContentController.GetHomeContent);
router.put('/:key', auth(Role.ADMIN), HomeContentController.UpsertHomeContent);

export const homeContentRouter = router;
