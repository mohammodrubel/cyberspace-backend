import catchAsync from '../../utils/catchAsync';
import { HomeContentService } from './homeContent.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const GetAllHomeContent = catchAsync(async (_req, res) => {
  const result = await HomeContentService.GetAllHomeContent();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Home content retrieved', data: result });
});

const GetHomeContent = catchAsync(async (req, res) => {
  const result = await HomeContentService.GetHomeContent(req.params.key);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Home content retrieved', data: result });
});

const UpsertHomeContent = catchAsync(async (req, res) => {
  const result = await HomeContentService.UpsertHomeContent(req.params.key, req.body.value);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Home content updated', data: result });
});

export const HomeContentController = { GetAllHomeContent, GetHomeContent, UpsertHomeContent };
