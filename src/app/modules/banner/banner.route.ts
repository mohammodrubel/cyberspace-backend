import { Router } from 'express';
import { BannerController } from './banner.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', BannerController.GetAllBanners); // public: returns all for admin context
router.get('/active', BannerController.GetActiveBanners); // public: returns only active
router.get('/:id', auth(Role.ADMIN), BannerController.GetBannerById);
router.post('/', auth(Role.ADMIN), BannerController.CreateBanner);
router.patch('/:id', auth(Role.ADMIN), BannerController.UpdateBanner);
router.delete('/:id', auth(Role.ADMIN), BannerController.DeleteBanner);

export const bannerRouter = router;
