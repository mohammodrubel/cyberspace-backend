import { Router } from 'express';
import { PartnerController } from './partner.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', PartnerController.GetAllPartners);
router.get('/active', PartnerController.GetActivePartners);
router.get('/:id', auth(Role.ADMIN), PartnerController.GetPartnerById);
router.post('/', auth(Role.ADMIN), PartnerController.CreatePartner);
router.patch('/:id', auth(Role.ADMIN), PartnerController.UpdatePartner);
router.delete('/:id', auth(Role.ADMIN), PartnerController.DeletePartner);

export const partnerRouter = router;
