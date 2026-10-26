import catchAsync from '../../utils/catchAsync';
import { CategoryService } from './category.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const GetAllCategories = catchAsync(async (_req, res) => {
  const result = await CategoryService.GetAllCategories();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Categories retrieved', data: result });
});

const GetCategoryById = catchAsync(async (req, res) => {
  const result = await CategoryService.GetCategoryById(Number(req.params.id));
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Category retrieved', data: result });
});

const CreateCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.CreateCategory(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Category created', data: result });
});

const UpdateCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.UpdateCategory(Number(req.params.id), req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Category updated', data: result });
});

const DeleteCategory = catchAsync(async (req, res) => {
  await CategoryService.DeleteCategory(Number(req.params.id));
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Category deleted' });
});

export const CategoryController = { GetAllCategories, GetCategoryById, CreateCategory, UpdateCategory, DeleteCategory };
