import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { userRouter } from '../modules/user/user.router';
import { productRouter } from '../modules/product/product.route';
import { inquiryRouter } from '../modules/inquiry/inquiry.route';
import { settingRouter } from '../modules/setting/setting.route';
import { bannerRouter } from '../modules/banner/banner.route';
import { partnerRouter } from '../modules/partner/partner.route';
import { newsRouter } from '../modules/news/news.route';
import { uploadRouter } from '../modules/upload/upload.route';
import { categoryRouter } from '../modules/category/category.route';

const router = express.Router();

type Route = { path: string; route: express.Router };

const routes: Route[] = [
  { path: '/auth', route: AuthRoutes },
  { path: '/user', route: userRouter },
  { path: '/products', route: productRouter },
  { path: '/inquiries', route: inquiryRouter },
  { path: '/settings', route: settingRouter },
  { path: '/banners', route: bannerRouter },
  { path: '/partners', route: partnerRouter },
  { path: '/news', route: newsRouter },
  { path: '/upload', route: uploadRouter },
  { path: '/categories', route: categoryRouter },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
