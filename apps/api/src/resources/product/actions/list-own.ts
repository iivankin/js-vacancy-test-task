import { AppKoaContext, AppRouter } from 'types';

import productService from '../product.service';

async function handler(ctx: AppKoaContext) {
  const result = await productService.find(
    {
      sellerId: ctx.state.user._id,
    },
    {},
    { sort: { createdOn: 'desc' } },
  );

  ctx.body = result.results;
}

export default (router: AppRouter) => {
  router.get('/list-own', handler);
};
