import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Role } from '@prisma/client';
import config from '../../config';

const GetAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const GetSingleUser = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const userProfile = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const DeleteUser = async (id: number) => {
  await prisma.user.delete({ where: { id } });
};

const UpdateUserRole = async (id: number, role: Role) => {
  return prisma.user.update({
    where: { id },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const CreateAdminUser = async (data: { name: string; email: string; password: string }) => {
  const existing = await prisma.user.findFirst({ where: { email: data.email } });
  if (existing) {
    throw new AppError(httpStatus.CONFLICT, 'User with this email already exists');
  }
  const hashedPassword = await bcrypt.hash(data.password, Number(config.bcrypt_salt_rounds));
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'ADMIN',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const ToggleUserActive = async (id: number, isActive: boolean) => {
  return prisma.user.update({
    where: { id },
    data: { isActive },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const UserService = {
  GetAllUsers,
  GetSingleUser,
  userProfile,
  DeleteUser,
  UpdateUserRole,
  CreateAdminUser,
  ToggleUserActive,
};
