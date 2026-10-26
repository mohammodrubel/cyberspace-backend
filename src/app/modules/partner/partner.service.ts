import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

interface IPartner {
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  descAZ?: string;
  descEN?: string;
  descRU?: string;
  isActive?: boolean;
  order?: number;
}

const GetAllPartners = async () => {
  return prisma.partner.findMany({ orderBy: { order: 'asc' } });
};

const GetActivePartners = async () => {
  return prisma.partner.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
};

const GetPartnerById = async (id: number) => {
  const p = await prisma.partner.findUnique({ where: { id } });
  if (!p) throw new AppError(httpStatus.NOT_FOUND, 'Partner not found');
  return p;
};

const CreatePartner = async (data: IPartner) => {
  return prisma.partner.create({ data });
};

const UpdatePartner = async (id: number, data: Partial<IPartner>) => {
  const p = await prisma.partner.findUnique({ where: { id } });
  if (!p) throw new AppError(httpStatus.NOT_FOUND, 'Partner not found');
  return prisma.partner.update({ where: { id }, data });
};

const DeletePartner = async (id: number) => {
  const p = await prisma.partner.findUnique({ where: { id } });
  if (!p) throw new AppError(httpStatus.NOT_FOUND, 'Partner not found');
  await prisma.partner.delete({ where: { id } });
};

export const PartnerService = { GetAllPartners, GetActivePartners, GetPartnerById, CreatePartner, UpdatePartner, DeletePartner };
