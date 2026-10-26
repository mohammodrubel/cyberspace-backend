import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { sendImageToCloudinary } from '../../utils/uploadImageMiddleware';
import AppError from '../../errors/AppError';

const UploadImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError(httpStatus.BAD_REQUEST, 'No image file provided');
  const imageUrl = await sendImageToCloudinary(req.file.path, req.file.originalname);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Image uploaded', data: { imageUrl } });
});

export const UploadController = { UploadImage };
