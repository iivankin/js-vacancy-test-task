import multer from '@koa/multer';

import { validateMiddleware } from 'middlewares';
import { cloudStorageService } from 'services';

import { createSchema } from 'schemas';
import { AppKoaContext, AppRouter, CreateParams, Next } from 'types';

import productService from '../product.service';

const upload = multer();

async function validator(ctx: AppKoaContext<CreateParams>, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext<CreateParams>) {
  const { user } = ctx.state;
  const { file } = ctx.request;
  const { title, price, quantity } = ctx.validatedData;

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  await cloudStorageService.uploadPublic(`images/${fileName}`, file);

  const product = await productService.insertOne({
    sellerId: user._id,
    title,
    price,
    image: fileName,
    quantity,
  });

  ctx.body = product;
}

export default (router: AppRouter) => {
  router.put('/new', upload.single('file'), validateMiddleware(createSchema), validator, handler);
};
