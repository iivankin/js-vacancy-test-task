import React, { FC, ReactElement } from 'react';
import { AppShell, Stack } from '@mantine/core';

import { accountApi } from 'resources/account';

import { CartProvider } from 'contexts/cart.context';

import Header from './Header';

import classes from './style.module.css';

interface MainLayoutProps {
  children: ReactElement;
}

const HEADER_HEIGHT = 43 + 32 + 32 + 4;

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <CartProvider>
      <AppShell component={Stack} bg="black-50">
        <Header />

        <AppShell.Main px={48} pb={32} w="100%" pt={HEADER_HEIGHT}>
          <div className={classes.content}>{children}</div>
        </AppShell.Main>
      </AppShell>
    </CartProvider>
  );
};

export default MainLayout;
