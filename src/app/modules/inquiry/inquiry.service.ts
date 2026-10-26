import prisma from '../../utils/prisma';
import { InquiryStatus } from '@prisma/client';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

interface CreateInquiryData {
  productId: string;
  name: string;
  phone: string;
  message?: string;
  submittedById?: number;
}

const CreateInquiry = async (data: CreateInquiryData) => {
  const product = await prisma.product.findUnique({ where: { id: data.productId } });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return prisma.inquiry.create({
    data: {
      productId: data.productId,
      name: data.name,
      phone: data.phone,
      message: data.message,
      submittedById: data.submittedById,
      status: 'NEW',
    },
    include: {
      product: { include: { translations: true } },
    },
  });
};

const GetAllInquiries = async () => {
  return prisma.inquiry.findMany({
    include: {
      product: { include: { translations: true } },
      submittedBy: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

const GetInquiriesByUser = async (userId: number) => {
  return prisma.inquiry.findMany({
    where: { submittedById: userId },
    include: {
      product: { include: { translations: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

const GetInquiryById = async (id: number) => {
  return prisma.inquiry.findUnique({
    where: { id },
    include: {
      product: { include: { translations: true } },
      submittedBy: { select: { id: true, name: true, email: true } },
    },
  });
};

const UpdateInquiryStatus = async (id: number, status: InquiryStatus) => {
  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) {
    throw new AppError(httpStatus.NOT_FOUND, 'Inquiry not found');
  }
  return prisma.inquiry.update({
    where: { id },
    data: { status },
    include: {
      product: { include: { translations: true } },
    },
  });
};

export const InquiryService = {
  CreateInquiry,
  GetAllInquiries,
  GetInquiriesByUser,
  GetInquiryById,
  UpdateInquiryStatus,
};
