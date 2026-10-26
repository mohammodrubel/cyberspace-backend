import prisma from '../../utils/prisma';

const GetHomeContent = async (key: string) => {
  return prisma.homeContent.findUnique({ where: { key } });
};

const GetAllHomeContent = async () => {
  return prisma.homeContent.findMany();
};

const UpsertHomeContent = async (key: string, value: object) => {
  return prisma.homeContent.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
};

export const HomeContentService = { GetHomeContent, GetAllHomeContent, UpsertHomeContent };
