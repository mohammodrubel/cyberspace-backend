import catchAsync from '../../utils/catchAsync';
import { NewsService } from './news.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const GetAllNews = catchAsync(async (_req, res) => {
  const result = await NewsService.GetAllNews();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'News retrieved', data: result });
});

const GetPublishedNews = catchAsync(async (_req, res) => {
  const result = await NewsService.GetPublishedNews();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Published news retrieved', data: result });
});

const GetNewsBySlug = catchAsync(async (req, res) => {
  const result = await NewsService.GetNewsBySlug(req.params.slug);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'News retrieved', data: result });
});

const GetNewsById = catchAsync(async (req, res) => {
  const result = await NewsService.GetNewsById(Number(req.params.id));
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'News retrieved', data: result });
});

const CreateNews = catchAsync(async (req, res) => {
  const result = await NewsService.CreateNews(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'News created', data: result });
});

const UpdateNews = catchAsync(async (req, res) => {
  const result = await NewsService.UpdateNews(Number(req.params.id), req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'News updated', data: result });
});

const DeleteNews = catchAsync(async (req, res) => {
  await NewsService.DeleteNews(Number(req.params.id));
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'News deleted' });
});

export const NewsController = { GetAllNews, GetPublishedNews, GetNewsBySlug, GetNewsById, CreateNews, UpdateNews, DeleteNews };
