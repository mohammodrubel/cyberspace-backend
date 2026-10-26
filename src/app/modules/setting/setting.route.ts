import { Router } from 'express';
import { SettingController } from './setting.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', SettingController.GetAllSettings);
router.patch('/:key', auth(Role.ADMIN), SettingController.UpsertSetting);

export const settingRouter = router;
