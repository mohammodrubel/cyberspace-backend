import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BannerService } from './banner.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const GetAllBanners = catchAsync(async (_req, res) => {
  const result = await BannerService.GetAllBanners();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Banners retrieved', data: result });
});

const GetActiveBanners = catchAsync(async (_req, res) => {
  const result = await BannerService.GetActiveBanners();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Active banners retrieved', data: result });
});

const GetBannerById = catchAsync(async (req, res) => {
  const result = await BannerService.GetBannerById(Number(req.params.id));
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Banner retrieved', data: result });
});

const CreateBanner = catchAsync(async (req, res) => {
  const result = await BannerService.CreateBanner(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Banner created', data: result });
});

const UpdateBanner = catchAsync(async (req, res) => {
  const result = await BannerService.UpdateBanner(Number(req.params.id), req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Banner updated', data: result });
});

const DeleteBanner = catchAsync(async (req, res) => {
  await BannerService.DeleteBanner(Number(req.params.id));
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Banner deleted' });
});

export const BannerController = { GetAllBanners, GetActiveBanners, GetBannerById, CreateBanner, UpdateBanner, DeleteBanner };
