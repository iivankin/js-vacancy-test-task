import React, { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Center, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';

import { productApi } from 'resources/product';

import { ProductCard } from 'components';

import { AddIcon } from 'public/icons';

import { handleApiError } from 'utils';

import { RoutePath } from 'routes';

const Products: NextPage = () => {
  const { data: products } = productApi.useListOwn();

  const { mutate } = productApi.useRemoveProduct();

  const onRemove = (id: string) => {
    modals.openConfirmModal({
      title: 'Delete product',
      centered: true,
      children: <Text size="sm">Are you sure you want to delete your product?</Text>,
      labels: { confirm: 'Delete product', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      cancelProps: { variant: 'outline' },
      onConfirm: () =>
        mutate(
          { id },
          {
            onError: (e) => handleApiError(e),
            onSuccess: () => {
              showNotification({
                title: 'Success',
                message: 'Product has been succesfully deleted.',
                color: 'green',
              });
            },
          },
        ),
    });
  };

  return (
    <>
      <Head>
        <title>Your products</title>
      </Head>
      <Stack gap={20} mt={10}>
        <Title order={3} fz="xl" c="black-600">
          Your products
        </Title>
        <Group gap={20}>
          <Link href={RoutePath.NewProduct}>
            <Paper w={271} h={266} bd="1px solid black-100" radius={12}>
              <Center h="100%">
                <AddIcon />
              </Center>
            </Paper>
          </Link>
          {products?.map((product) => (
            <ProductCard key={product._id} data={product} showControlButtons onRemove={() => onRemove(product._id)} />
          ))}
        </Group>
      </Stack>
    </>
  );
};

export default Products;
