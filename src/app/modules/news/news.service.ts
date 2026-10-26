import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Lang } from '@prisma/client';

interface INewsTranslation {
  lang: Lang;
  title: string;
  excerpt: string;
  body: string;
}

interface ICreateNews {
  slug: string;
  imageUrl?: string;
  authorName?: string;
  publishedAt?: Date;
  status?: 'DRAFT' | 'PUBLISHED';
  order?: number;
  translations: INewsTranslation[];
}

const GetAllNews = async () => {
  return prisma.news.findMany({
    include: { translations: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
};

const GetPublishedNews = async () => {
  return prisma.news.findMany({
    where: { status: 'PUBLISHED' },
    include: { translations: true },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  });
};

const GetNewsBySlug = async (slug: string) => {
  const news = await prisma.news.findUnique({
    where: { slug },
    include: { translations: true },
  });
  if (!news) throw new AppError(httpStatus.NOT_FOUND, 'News article not found');
  return news;
};

const GetNewsById = async (id: number) => {
  const news = await prisma.news.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!news) throw new AppError(httpStatus.NOT_FOUND, 'News article not found');
  return news;
};

const CreateNews = async (data: ICreateNews) => {
  const existing = await prisma.news.findUnique({ where: { slug: data.slug } });
  if (existing) throw new AppError(httpStatus.CONFLICT, 'News with this slug already exists');
  const { translations, ...newsData } = data;
  return prisma.news.create({
    data: { ...newsData, translations: { create: translations } },
    include: { translations: true },
  });
};

const UpdateNews = async (id: number, data: Partial<ICreateNews>) => {
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) throw new AppError(httpStatus.NOT_FOUND, 'News article not found');
  const { translations, ...newsData } = data;
  if (translations && translations.length > 0) {
    await prisma.$transaction(async (tx) => {
      await tx.newsTranslation.deleteMany({ where: { newsId: id } });
      await tx.newsTranslation.createMany({ data: translations.map((t) => ({ ...t, newsId: id })) });
    });
  }
  return prisma.news.update({ where: { id }, data: newsData, include: { translations: true } });
};

const DeleteNews = async (id: number) => {
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) throw new AppError(httpStatus.NOT_FOUND, 'News article not found');
  await prisma.news.delete({ where: { id } });
};

export const NewsService = { GetAllNews, GetPublishedNews, GetNewsBySlug, GetNewsById, CreateNews, UpdateNews, DeleteNews };
