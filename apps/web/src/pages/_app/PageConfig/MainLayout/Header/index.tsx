import React, { FC, memo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Anchor, AppShell, Box, FloatingIndicator, Group } from '@mantine/core';

import { accountApi } from 'resources/account';

import { LogoImage } from 'public/images';

import { RoutePath } from 'routes';

import NavLink from './components/NavLink';
import UserMenu from './components/UserMenu';

import classes from '../style.module.css';

function root(href: string) {
  const parts = href.split('/');
  return `/${parts[1]}`;
}

const Header: FC = () => {
  const { data: account } = accountApi.useGet();
  const { route } = useRouter();
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLAnchorElement | null>>({});

  const setControlRef = (href: string) => (node: HTMLAnchorElement) => {
    controlsRefs[href] = node;
    setControlsRefs(controlsRefs);
  };

  if (!account) return null;

  return (
    <AppShell.Header withBorder={false} bg="black-50" px={48}>
      <Box className={classes.content}>
        <Group py={32} justify="space-between">
          <Anchor component={Link} href={RoutePath.Home} inline underline="never">
            <LogoImage />
          </Anchor>

          <Group gap={32} ref={setRootRef} className={classes.root}>
            <NavLink href={RoutePath.Home} title="Marketplace" setControlRef={setControlRef} />
            <NavLink href={RoutePath.Products} title="Your products" setControlRef={setControlRef} />
            <FloatingIndicator target={controlsRefs[root(route)]} parent={rootRef} className={classes.indicator} />
          </Group>

          <UserMenu />
        </Group>
      </Box>
    </AppShell.Header>
  );
};

export default memo(Header);
