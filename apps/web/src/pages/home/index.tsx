import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Center, Group, NumberInput, Pagination, Paper, Stack, Text } from '@mantine/core';

import { productApi } from 'resources/product';

import { ProductCard } from 'components';

import { XIcon } from 'public/icons';

import { useCartContext } from 'contexts/cart.context';

import Filters from './components/Filters';
import { DEFAULT_PARAMS } from './constants';

import classes from './style.module.css';

const Home: NextPage = () => {
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const { cart, addToCart } = useCartContext();

  const onPriceFinish = () => {
    if (priceFrom && priceTo) {
      setParams({ ...params, searchPrice: { from: Number.parseFloat(priceFrom), to: Number.parseFloat(priceTo) } });
    }
  };

  const onReset = () => {
    setPriceFrom('');
    setPriceTo('');
    setParams({ ...params, searchPrice: undefined });
  };

  const setPage = (page: number) => {
    setParams({ ...params, page });
  };

  const { data } = productApi.useList(params);

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>
      <Group gap={28} align="flex-start" wrap="nowrap">
        <Paper w={315} p="lg" bd="1px solid black-100" radius={12}>
          <Group justify="space-between">
            <Text size="xl" c="black-600" fw="bold" lh="24px">
              Filters
            </Text>
            {(params.searchName || params.searchPrice) && (
              <button className={classes.remove} type="button" onClick={onReset}>
                <Text size="sm" c="black-300" fw="500">
                  Reset all
                </Text>
                <XIcon />
              </button>
            )}
          </Group>
          <Text mt={32} size="md" lh="19px" c="black-600" fw="bold">
            Price
          </Text>
          <Group mt={12} gap={12}>
            <NumberInput
              onChange={(val) => {
                setPriceFrom(val.toString());
              }}
              size="sm"
              fw="500"
              onBlur={onPriceFinish}
              w={131}
              placeholder=""
              suffix="$"
              min={1}
              leftSectionWidth={55}
              leftSection={
                <Text size="sm" c="black-300" pl={12} pr={4} fw="500">
                  From:
                </Text>
              }
              value={priceFrom}
            />
            <NumberInput
              onChange={(val) => {
                setPriceTo(val.toString());
              }}
              size="sm"
              fw="500"
              onBlur={onPriceFinish}
              w={130}
              placeholder=""
              suffix="$"
              min={1}
              leftSectionWidth={38}
              leftSection={
                <Text size="sm" c="black-300" pl={12} pr={4} fw="500">
                  To:
                </Text>
              }
              value={priceTo}
            />
          </Group>
        </Paper>
        <Stack gap={20} flex={1}>
          <Filters params={params} setParams={setParams} recordCount={data?.count} onReset={onReset} />
          <Group gap={20}>
            {data?.results.map((product) => (
              <ProductCard
                key={product._id}
                data={product}
                inCart={!!cart.find((it) => it.product._id === product._id)}
                onAddToCart={() => addToCart(product)}
                showBuyButton
              />
            ))}
            {data && data.results.length === 0 && (
              <Center w="100%">
                <Text mt={40} c="black-600" fw="bold" size="xl">
                  No products found
                </Text>
              </Center>
            )}
          </Group>
        </Stack>
      </Group>
      {data && data.results.length > 0 && (
        <Center>
          <Pagination total={data.pagesCount} value={params.page} onChange={setPage} mt={32} />
        </Center>
      )}
    </>
  );
};

export default Home;
