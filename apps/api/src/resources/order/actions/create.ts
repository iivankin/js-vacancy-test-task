import Stripe from 'stripe';

import productService from 'resources/product/product.service';

import { validateMiddleware } from 'middlewares';

import config from 'config';

import { createOrderSchema } from 'schemas';
import { AppKoaContext, AppRouter, CreateOrderParams, Next, Order, OrderStatus } from 'types';

import orderService from '../order.service';

async function validator(ctx: AppKoaContext<CreateOrderParams>, next: Next) {
  const products = ctx.validatedData.data;

  // We first check if user added same product twice
  const checkedIds: string[] = [];
  for (const product of products) {
    if (checkedIds.includes(product.productId)) {
      ctx.assertClientError(true, { global: 'Product already exists' });
    }

    checkedIds.push(product.productId);
  }

  await next();
}

async function handler(ctx: AppKoaContext<CreateOrderParams>) {
  const { user } = ctx.state;
  const products = ctx.validatedData.data;

  const productData = await productService.find({ _id: { $in: products.map((product) => product.productId) } });
  if (productData.results.length !== products.length) {
    ctx.assertClientError(true, { global: 'Some products does not exist' });
  }

  for (const product of products) {
    if (product.quantity > productData.results.find((p) => p._id === product.productId)!.quantity) {
      ctx.assertClientError(true, { global: 'Some products does not have stock' });
    }
  }

  const processedProducts: Order['items'] = [];
  for (const product of products) {
    const data = productData.results.find((p) => p._id === product.productId)!;
    processedProducts.push({
      productId: data._id,
      quantity: product.quantity,
      title: data.title,
      price: data.price,
      image: data.image,
    });
  }

  const order = await orderService.insertOne({
    buyerId: user._id,
    session: 'none',
    status: OrderStatus.PENDING,
    items: processedProducts,
  });

  const stripe = new Stripe(config.STRIPE_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    // It will be better to do it through webhooks, but for now we can use this
    success_url: `${config.API_URL}/orders/success/${order._id}`,
    cancel_url: `${config.API_URL}/orders/cancel/${order._id}`,
    line_items: processedProducts.map((product) => ({
      price_data: {
        currency: 'usd',
        unit_amount: product.price * 100,
        product_data: {
          name: product.title,
        },
      },
      quantity: product.quantity,
    })),
  });

  await orderService.atomic.updateOne({ _id: order._id }, { $set: { session: session.id } });

  ctx.body = { url: session.url };
}

export default (router: AppRouter) => {
  router.put('/new', validateMiddleware(createOrderSchema), validator, handler);
};
