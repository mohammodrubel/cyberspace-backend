import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { Role } from '@prisma/client';

const GetAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const result = await UserService.GetAllUsers();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Users retrieved', data: result });
});

const GetSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params?.id);
  const result = await UserService.GetSingleUser(id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'User retrieved', data: result });
});

const userProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.user!.id;
  const result = await UserService.userProfile(id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Profile retrieved', data: result });
});

const DeleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params?.id);
  await UserService.DeleteUser(id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const UpdateUserRole = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params?.id);
  const { role } = req.body as { role: Role };
  const result = await UserService.UpdateUserRole(id, role);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Role updated', data: result });
});

const CreateAdminUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.CreateAdminUser(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Admin user created', data: result });
});

const ToggleUserActive = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params?.id);
  const { isActive } = req.body as { isActive: boolean };
  const result = await UserService.ToggleUserActive(id, isActive);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'User updated', data: result });
});

export const UserController = {
  GetAllUsers,
  GetSingleUser,
  DeleteUser,
  userProfile,
  UpdateUserRole,
  CreateAdminUser,
  ToggleUserActive,
};
