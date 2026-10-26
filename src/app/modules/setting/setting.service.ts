import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const GetAllSettings = async () => {
  return prisma.setting.findMany();
};

const GetSetting = async (key: string) => {
  return prisma.setting.findUnique({ where: { key } });
};

const UpsertSetting = async (key: string, value: boolean) => {
  const allowed = ['showPrices', 'showStock'];
  if (!allowed.includes(key)) {
    throw new AppError(httpStatus.BAD_REQUEST, `Invalid setting key: ${key}`);
  }
  return prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
};

export const SettingService = { GetAllSettings, GetSetting, UpsertSetting };
