import { Router } from 'express';
import { UploadController } from './upload.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import { uploadImage } from '../../utils/uploadImageMiddleware';

const router = Router();

router.post('/image', auth(Role.ADMIN), uploadImage.single('image'), UploadController.UploadImage);

export const uploadRouter = router;
