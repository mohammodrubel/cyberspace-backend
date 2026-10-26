import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProductService } from './product.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const GetAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.GetAllProducts();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Products retrieved', data: result });
});

const GetProductById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.GetProductById(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Product retrieved', data: result });
});

const CreateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.CreateProduct(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Product created', data: result });
});

const UpdateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.UpdateProduct(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Product updated', data: result });
});

const DeleteProduct = catchAsync(async (req: Request, res: Response) => {
  await ProductService.DeleteProduct(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Product deleted' });
});

export const ProductController = { GetAllProducts, GetProductById, CreateProduct, UpdateProduct, DeleteProduct };
