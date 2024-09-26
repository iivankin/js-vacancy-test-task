import { AppKoaContext, AppRouter, OrderStatus } from 'types';

import orderService from '../order.service';

async function handler(ctx: AppKoaContext) {
  const result = await orderService.find(
    {
      buyerId: ctx.state.user._id,
      status: OrderStatus.COMPLETED,
    },
    {},
    { sort: { completedAt: 'desc' } },
  );

  ctx.body = result.results;
}

export default (router: AppRouter) => {
  router.get('/list', handler);
};
