import React, { FC, ReactElement } from 'react';
import Image from 'next/image';
import { Center, SimpleGrid, Stack } from '@mantine/core';

import classes from './style.module.css';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
    <Center component="main" h="100vh" w="100%" px={32}>
      {children}
    </Center>

    <Stack h="100%" p={32}>
      <Stack bg="#F4F4F4" w="100%" h="100%" className={classes.imageContainer}>
        <Image src="/images/promo.png" alt="Promo image" className={classes.image} fill quality={95} />
      </Stack>
    </Stack>
  </SimpleGrid>
);

export default UnauthorizedLayout;
