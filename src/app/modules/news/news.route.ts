import { Router } from 'express';
import { NewsController } from './news.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/published', NewsController.GetPublishedNews);
router.get('/slug/:slug', NewsController.GetNewsBySlug);
router.get('/', auth(Role.ADMIN), NewsController.GetAllNews);
router.get('/:id', auth(Role.ADMIN), NewsController.GetNewsById);
router.post('/', auth(Role.ADMIN), NewsController.CreateNews);
router.patch('/:id', auth(Role.ADMIN), NewsController.UpdateNews);
router.delete('/:id', auth(Role.ADMIN), NewsController.DeleteNews);

export const newsRouter = router;
