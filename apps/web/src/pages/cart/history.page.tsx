import { useMemo } from 'react';
import React, { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Divider, Group, Stack, Text } from '@mantine/core';

import { orderApi } from 'resources/order';

import { STORAGE_URL } from 'app-constants';

import CartLayout from './components/Layout/CartLayout';

import classes from './style.module.css';

const Cart: NextPage = () => {
  const { data, isLoading } = orderApi.useList();

  const isEmpty = !data || data.length === 0;

  const items = useMemo(() => {
    if (!data) return [];

    return data
      .map((item) =>
        item.items.map((it) => ({
          id: `${item._id}-${it.productId}`,
          title: it.title,
          price: it.price,
          image: it.image,
          date: item.updatedOn!,
        })),
      )
      .flat();
  }, [data]);

  return (
    <>
      <Head>
        <title>Order history</title>
      </Head>
      <CartLayout showEmpty={isEmpty} isLoading={isLoading} rightElement={<Box w={315 + 144} />}>
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
                Date
              </Text>
            </Box>
          </Group>
          {items.map((item, index) => (
            <Stack key={item.id} gap={0}>
              <Group pt={index !== 0 ? 16 : 0} pb={index === items.length - 1 ? 0 : 16} wrap="nowrap" gap={0}>
                <Group maw="519px" w="100%" gap={25}>
                  <Box w={80} h={80} className={classes.image}>
                    <Image src={`${STORAGE_URL}/images/${item.image}`} alt="Product" width={80} height={80} />
                  </Box>
                  <Text size="md" fw="bold" c="black-600">
                    {item.title}
                  </Text>
                </Group>
                <Box className={classes.fixed}>
                  <Text size="md" c="black-600" ta="end">
                    ${item.price}
                  </Text>
                </Box>
                <Box className={classes.fixed}>
                  <Text size="md" c="black-600" ta="end">
                    {new Date(item.date).toLocaleDateString(undefined, {
                      month: '2-digit',
                      day: '2-digit',
                      year: '2-digit',
                    })}
                  </Text>
                </Box>
              </Group>
              {index !== items.length - 1 && <Divider c="black-200" />}
            </Stack>
          ))}
        </Stack>
      </CartLayout>
    </>
  );
};

export default Cart;
