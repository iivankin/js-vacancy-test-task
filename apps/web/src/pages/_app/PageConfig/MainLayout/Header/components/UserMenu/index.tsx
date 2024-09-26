import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Badge, Box, Group } from '@mantine/core';
import clsx from 'clsx';

import { accountApi } from 'resources/account';

import { CartIcon, LogoutIcon } from 'public/icons';

import { useCartContext } from 'contexts/cart.context';

import { RoutePath } from 'routes';

import classes from './style.module.css';

const UserMenu: FC = () => {
  const { route, push } = useRouter();
  const { mutate: signOut } = accountApi.useSignOut();
  const { cart } = useCartContext();

  return (
    <Group gap={32}>
      <button
        type="button"
        onClick={() => push(RoutePath.Cart)}
        className={clsx(route.startsWith(RoutePath.Cart) && classes.active, classes.button, classes.cart)}
      >
        <CartIcon />
        <Box className={classes.badge}>
          <Badge size="md" circle>
            {cart.length}
          </Badge>
        </Box>
      </button>
      <button type="button" onClick={() => signOut()} className={classes.button}>
        <LogoutIcon />
      </button>
    </Group>
  );
};

export default UserMenu;
