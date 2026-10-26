import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

interface ICreateCategory {
  slug: string;
  nameAZ: string;
  nameEN: string;
  nameRU: string;
  imageUrl?: string | null;
  isActive?: boolean;
  order?: number;
}

const GetAllCategories = async () => {
  return prisma.category.findMany({ orderBy: { order: 'asc' } });
};

const GetCategoryById = async (id: number) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  return category;
};

const CreateCategory = async (data: ICreateCategory) => {
  const existing = await prisma.category.findUnique({ where: { slug: data.slug } });
  if (existing) throw new AppError(httpStatus.CONFLICT, 'A category with this slug already exists');
  return prisma.category.create({ data });
};

const UpdateCategory = async (id: number, data: Partial<ICreateCategory>) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  if (data.slug && data.slug !== category.slug) {
    const conflict = await prisma.category.findUnique({ where: { slug: data.slug } });
    if (conflict) throw new AppError(httpStatus.CONFLICT, 'A category with this slug already exists');
  }
  return prisma.category.update({ where: { id }, data });
};

const DeleteCategory = async (id: number) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  await prisma.category.delete({ where: { id } });
};

export const CategoryService = { GetAllCategories, GetCategoryById, CreateCategory, UpdateCategory, DeleteCategory };
