import catchAsync from '../../utils/catchAsync';
import { PartnerService } from './partner.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const GetAllPartners = catchAsync(async (_req, res) => {
  const result = await PartnerService.GetAllPartners();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Partners retrieved', data: result });
});

const GetActivePartners = catchAsync(async (_req, res) => {
  const result = await PartnerService.GetActivePartners();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Active partners retrieved', data: result });
});

const GetPartnerById = catchAsync(async (req, res) => {
  const result = await PartnerService.GetPartnerById(Number(req.params.id));
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Partner retrieved', data: result });
});

const CreatePartner = catchAsync(async (req, res) => {
  const result = await PartnerService.CreatePartner(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Partner created', data: result });
});

const UpdatePartner = catchAsync(async (req, res) => {
  const result = await PartnerService.UpdatePartner(Number(req.params.id), req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Partner updated', data: result });
});

const DeletePartner = catchAsync(async (req, res) => {
  await PartnerService.DeletePartner(Number(req.params.id));
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Partner deleted' });
});

export const PartnerController = { GetAllPartners, GetActivePartners, GetPartnerById, CreatePartner, UpdatePartner, DeletePartner };
