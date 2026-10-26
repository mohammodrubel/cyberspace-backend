import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { ICreateBanner } from './banner.interface';

const GetAllBanners = async () => {
  return prisma.banner.findMany({ orderBy: { order: 'asc' } });
};

const GetActiveBanners = async () => {
  return prisma.banner.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
};

const GetBannerById = async (id: number) => {
  const banner = await prisma.banner.findUnique({ where: { id } });
  if (!banner) throw new AppError(httpStatus.NOT_FOUND, 'Banner not found');
  return banner;
};

const CreateBanner = async (data: ICreateBanner) => {
  return prisma.banner.create({ data });
};

const UpdateBanner = async (id: number, data: Partial<ICreateBanner>) => {
  const banner = await prisma.banner.findUnique({ where: { id } });
  if (!banner) throw new AppError(httpStatus.NOT_FOUND, 'Banner not found');
  return prisma.banner.update({ where: { id }, data });
};

const DeleteBanner = async (id: number) => {
  const banner = await prisma.banner.findUnique({ where: { id } });
  if (!banner) throw new AppError(httpStatus.NOT_FOUND, 'Banner not found');
  await prisma.banner.delete({ where: { id } });
};

export const BannerService = { GetAllBanners, GetActiveBanners, GetBannerById, CreateBanner, UpdateBanner, DeleteBanner };
