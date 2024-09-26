import { validateMiddleware } from 'middlewares';
import { stringUtil } from 'utils';

import { paginationSchema } from 'schemas';
import { AppKoaContext, AppRouter, PaginationSchema } from 'types';

import productService from '../product.service';

async function handler(ctx: AppKoaContext<PaginationSchema>) {
  const { perPage, page, sort, searchName, searchPrice } = ctx.validatedData;

  const filterOptions = [];

  if (searchName) {
    const searchPattern = stringUtil.escapeRegExpString(searchName);

    filterOptions.push({
      title: { $regex: searchPattern },
    });
  }

  if (searchPrice) {
    filterOptions.push({
      price: {
        $gte: searchPrice.from,
        $lt: searchPrice.to,
      },
    });
  }

  const result = await productService.find(
    { ...(filterOptions.length && { $and: filterOptions }), quantity: { $gt: 0 } },
    { page, perPage },
    { sort: { createdOn: sort } },
  );

  ctx.body = result;
}

export default (router: AppRouter) => {
  router.get('/list', validateMiddleware(paginationSchema), handler);
};
