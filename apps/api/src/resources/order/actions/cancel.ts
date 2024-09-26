import Stripe from 'stripe';

import config from 'config';

import { AppKoaContext, AppRouter, OrderStatus } from 'types';

import orderService from '../order.service';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const stripe = new Stripe(config.STRIPE_KEY);
  const order = await orderService.findOne({ _id: ctx.request.params.id, status: OrderStatus.PENDING });
  if (!order) {
    return ctx.assertClientError(true, { global: 'Order not found' });
  }

  const session = await stripe.checkout.sessions.retrieve(order.session);
  if (session.status === 'complete') {
    return ctx.assertClientError(true, { global: 'Already completed' });
  }

  await orderService.atomic.updateOne({ _id: ctx.request.params.id }, { $set: { status: OrderStatus.CANCELLED } });

  return ctx.redirect(`${config.WEB_URL}/order/cancel`);
}

export default (router: AppRouter) => {
  router.get('/cancel/:id', handler);
};
