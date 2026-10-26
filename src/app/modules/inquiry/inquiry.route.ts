import { Router } from 'express';
import { InquiryController } from './inquiry.controller';
import auth from '../../middlewares/auth';
import optionalAuth from '../../middlewares/optionalAuth';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', optionalAuth, InquiryController.CreateInquiry);
router.get('/', auth(Role.ADMIN), InquiryController.GetAllInquiries);
router.get('/my', auth(), InquiryController.GetMyInquiries);
router.get('/:id', auth(), InquiryController.GetInquiryById);
router.patch('/:id/status', auth(Role.ADMIN), InquiryController.UpdateInquiryStatus);

export const inquiryRouter = router;
