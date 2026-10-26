import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { SettingService } from './setting.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const GetAllSettings = catchAsync(async (_req: Request, res: Response) => {
  const result = await SettingService.GetAllSettings();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Settings retrieved', data: result });
});

const UpsertSetting = catchAsync(async (req: Request, res: Response) => {
  const { key } = req.params;
  const { value } = req.body as { value: boolean };
  const result = await SettingService.UpsertSetting(key, value);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Setting updated', data: result });
});

export const SettingController = { GetAllSettings, UpsertSetting };
