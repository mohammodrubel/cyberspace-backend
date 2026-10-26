import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { randomUUID } from 'crypto';
import { Lang } from '@prisma/client';

interface IProductTranslation {
  lang: Lang;
  name: string;
  description?: string;
}

interface ICreateProduct {
  sku: string;
  brand?: string;
  category: string;
  imageUrl?: string | null;
  price?: number | null;
  currency?: string | null;
  stock?: number | null;
  translations: IProductTranslation[];
}

interface IUpdateProduct {
  sku?: string;
  brand?: string;
  category?: string;
  imageUrl?: string | null;
  price?: number | null;
  currency?: string | null;
  stock?: number | null;
  translations?: IProductTranslation[];
}

const GetAllProducts = async () => {
  return prisma.product.findMany({
    include: { translations: true },
    orderBy: { syncedAt: 'desc' },
  });
};

const GetProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { translations: true },
  });
};

const CreateProduct = async (data: ICreateProduct) => {
  const existing = await prisma.product.findUnique({ where: { sku: data.sku } });
  if (existing) throw new AppError(httpStatus.CONFLICT, 'A product with this SKU already exists');
  const { translations, ...productData } = data;
  return prisma.product.create({
    data: {
      id: randomUUID(),
      ...productData,
      syncedAt: new Date(),
      translations: { create: translations },
    },
    include: { translations: true },
  });
};

const UpdateProduct = async (id: string, data: IUpdateProduct) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  const { translations, ...productData } = data;
  if (translations && translations.length > 0) {
    await prisma.$transaction(async (tx) => {
      await tx.productTranslation.deleteMany({ where: { productId: id } });
      await tx.productTranslation.createMany({
        data: translations.map((t) => ({ ...t, productId: id })),
      });
    });
  }
  return prisma.product.update({
    where: { id },
    data: { ...productData, syncedAt: new Date() },
    include: { translations: true },
  });
};

const DeleteProduct = async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  await prisma.product.delete({ where: { id } });
};

export const ProductService = { GetAllProducts, GetProductById, CreateProduct, UpdateProduct, DeleteProduct };
