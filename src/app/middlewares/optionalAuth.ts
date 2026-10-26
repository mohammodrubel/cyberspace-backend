import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import prisma from '../utils/prisma';

const optionalAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken?.startsWith('Bearer ')) return next();

    const token = bearerToken.split(' ')[1];
    if (!token) return next();

    const decoded = jwt.verify(token, config.jwt_access_token_secret as string) as JwtPayload;
    const userId = Number(decoded.id);
    if (!userId || isNaN(userId)) return next();

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.isActive) req.user = user;
  } catch {
    // invalid/expired token — continue as anonymous
  }
  next();
};

export default optionalAuth;
