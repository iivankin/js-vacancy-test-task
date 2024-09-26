import React, { FC, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Center, Group, Stack, Text } from '@mantine/core';
import clsx from 'clsx';

import { RoutePath } from 'routes';

import classes from './style.module.css';

interface CartLayoutProps {
  children: ReactElement;
  rightElement?: ReactElement;
  isLoading: boolean;
  showEmpty: boolean;
}

const CartLayout: FC<CartLayoutProps> = ({ children, isLoading, rightElement, showEmpty }) => {
  const { route } = useRouter();

  return (
    <Group gap={78} mt={10} align="flex-start">
      <Stack gap={20} flex={1}>
        <Group gap={32}>
          <Link href={RoutePath.Cart} className={clsx(classes.link, route === RoutePath.Cart && classes.linkActive)}>
            <Text c="black-300">My cart</Text>
          </Link>
          <Link
            href={RoutePath.History}
            className={clsx(classes.link, route === RoutePath.History && classes.linkActive)}
          >
            <Text c="black-300">History</Text>
          </Link>
        </Group>
        {!isLoading &&
          (showEmpty ? (
            <Center mt={20}>
              <Stack gap={20} align="center">
                <Image src="/images/balloon.png" width={206} height={206} alt="Balloon" quality={95} />
                <Text fz="20px" lh="28px" fw="bold" c="black-600">
                  Oops, there&apos;s nothing here yet!
                </Text>
                <Text fz="14px" lh="20px" c="black-400" ta="center">
                  You haven&apos;t made any purchases yet.
                  <br />
                  Go to the marketplace and make purchases.
                </Text>
                <Button component={Link} href={RoutePath.Home}>
                  Go to Marketplace
                </Button>
              </Stack>
            </Center>
          ) : (
            children
          ))}
      </Stack>
      {!isLoading ? rightElement : null}
    </Group>
  );
};

export default CartLayout;
