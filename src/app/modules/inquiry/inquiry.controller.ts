import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { InquiryService } from './inquiry.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { InquiryStatus } from '@prisma/client';

const CreateInquiry = catchAsync(async (req: Request, res: Response) => {
  const submittedById = req.user?.id;
  const result = await InquiryService.CreateInquiry({ ...req.body, submittedById });
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Inquiry submitted', data: result });
});

const GetAllInquiries = catchAsync(async (_req: Request, res: Response) => {
  const result = await InquiryService.GetAllInquiries();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Inquiries retrieved', data: result });
});

const GetMyInquiries = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await InquiryService.GetInquiriesByUser(userId);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Inquiries retrieved', data: result });
});

const GetInquiryById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await InquiryService.GetInquiryById(id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Inquiry retrieved', data: result });
});

const UpdateInquiryStatus = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: InquiryStatus };
  const result = await InquiryService.UpdateInquiryStatus(id, status);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Status updated', data: result });
});

export const InquiryController = {
  CreateInquiry,
  GetAllInquiries,
  GetMyInquiries,
  GetInquiryById,
  UpdateInquiryStatus,
};
