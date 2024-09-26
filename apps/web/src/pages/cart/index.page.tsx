import { useMemo } from 'react';
import React, { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Button, Divider, Group, Paper, Stack, Text } from '@mantine/core';

import { orderApi } from 'resources/order';

import { CrossIcon, MinusIcon, PlusIcon } from 'public/icons';

import { useCartContext } from 'contexts/cart.context';
import { handleApiError } from 'utils';

import { STORAGE_URL } from 'app-constants';

import CartLayout from './components/Layout/CartLayout';

import classes from './style.module.css';

const Cart: NextPage = () => {
  const { cart, setCount, removeFromCart, loading } = useCartContext();

  const { mutate, isPending } = orderApi.useCreateOrder();

  const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0), [cart]);

  const onProceed = () => {
    mutate(
      { data: cart.map((item) => ({ productId: item.product._id, quantity: item.quantity })) },
      {
        onSuccess: (data) => {
          window.location.href = data.url;
        },
        onError: (e) => handleApiError(e),
      },
    );
  };

  const isEmpty = cart.length === 0;

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartLayout
        showEmpty={isEmpty}
        isLoading={loading}
        rightElement={
          !isEmpty ? (
            <Paper w={315} p="lg" bd="1px solid black-100" radius={12}>
              <Stack gap={32}>
                <Text size="xl" c="black-600" fw="bold" lh="24px">
                  Summary
                </Text>
                <Divider c="black-200" />
                <Group justify="space-between">
                  <Text size="md" lh="20px" c="black-400">
                    Total Price
                  </Text>
                  <Text size="md" lh="20px" c="black-600" fw="bold">
                    ${Math.round(totalPrice)}
                  </Text>
                </Group>
                <Button h={40} w="100%" loading={isPending} onClick={onProceed}>
                  Proceed to Checkout
                </Button>
              </Stack>
            </Paper>
          ) : undefined
        }
      >
        <Stack gap={0}>
          <Group py={12} wrap="nowrap" gap={0}>
            <Box maw="519px" w="100%">
              <Text size="md" c="black-400" lh="20px">
                Item
              </Text>
            </Box>
            <Box className={classes.fixed}>
              <Text size="md" c="black-400" ta="end" lh="20px">
                Unit Price
              </Text>
            </Box>
            <Box className={classes.fixed}>
              <Text size="md" c="black-400" ta="end" lh="20px">
                Quantity
              </Text>
            </Box>
            <Box className={classes.fixed} />
          </Group>
          {cart.map((item, index) => (
            <Stack key={item.product._id} gap={0}>
              <Group pt={index !== 0 ? 16 : 0} pb={index === cart.length - 1 ? 0 : 16} wrap="nowrap" gap={0}>
                <Group maw="519px" w="100%" gap={25}>
                  <Box w={80} h={80} className={classes.image}>
                    <Image src={`${STORAGE_URL}/images/${item.product.image}`} alt="Product" width={80} height={80} />
                  </Box>
                  <Text size="md" fw="bold" c="black-600">
                    {item.product.title}
                  </Text>
                </Group>
                <Box className={classes.fixed}>
                  <Text size="md" c="black-600" ta="end">
                    ${item.product.price}
                  </Text>
                </Box>
                <Box className={classes.fixed}>
                  <Group gap={12} justify="flex-end">
                    <button
                      className={classes.button}
                      type="button"
                      onClick={() => {
                        if (item.quantity === 1) return;
                        setCount(item.product._id, item.quantity - 1);
                      }}
                    >
                      <MinusIcon />
                    </button>
                    <Text size="md" c="black-600" ta="center" lh="32px" w={16}>
                      {item.quantity}
                    </Text>
                    <button
                      className={classes.button}
                      type="button"
                      onClick={() => {
                        if (item.quantity === item.product.quantity) return;
                        setCount(item.product._id, item.quantity + 1);
                      }}
                    >
                      <PlusIcon />
                    </button>
                  </Group>
                </Box>
                <Box className={classes.fixed}>
                  <button className={classes.remove} type="button" onClick={() => removeFromCart(item.product._id)}>
                    <CrossIcon />
                    <Text size="md" c="black-400" fw="500">
                      Remove
                    </Text>
                  </button>
                </Box>
              </Group>
              {index !== cart.length - 1 && <Divider c="black-200" />}
            </Stack>
          ))}
        </Stack>
      </CartLayout>
    </>
  );
};

export default Cart;
