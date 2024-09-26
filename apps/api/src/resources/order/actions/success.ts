import Stripe from 'stripe';

import productService from 'resources/product/product.service';

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
  if (session.status !== 'complete') {
    return ctx.assertClientError(true, { global: 'Not completed' });
  }

  const productList = order.items.map((item) => item.productId);

  await productService.updateMany({ _id: { $in: productList } }, (doc) => ({
    quantity: doc.quantity - order.items.find((item) => item.productId === doc._id)!.quantity,
  }));

  await orderService.atomic.updateOne(
    { _id: ctx.request.params.id },
    { $set: { status: OrderStatus.COMPLETED, completedAt: new Date() } },
  );

  return ctx.redirect(`${config.WEB_URL}/order/success`);
}

export default (router: AppRouter) => {
  router.get('/success/:id', handler);
};
