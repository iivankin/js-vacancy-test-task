import { cloudStorageService } from 'services';

import { AppKoaContext, AppRouter, Next } from 'types';

import productService from '../product.service';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isProductExists = await productService.exists({ _id: ctx.request.params.id, sellerId: ctx.state.user._id });

  ctx.assertError(isProductExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const product = await productService.findOne({ _id: ctx.request.params.id, sellerId: ctx.state.user._id });
  ctx.assertError(!!product, 'Product not found');

  cloudStorageService.deleteObject(`images/${product.image}`);

  await productService.deleteSoft({ _id: ctx.request.params.id });

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
