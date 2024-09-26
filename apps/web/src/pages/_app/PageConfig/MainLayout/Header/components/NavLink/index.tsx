import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Text } from '@mantine/core';
import clsx from 'clsx';

import classes from './style.module.css';

type NavLinkProps = {
  href: string;
  title: string;
  setControlRef: (href: string) => (node: HTMLAnchorElement) => void;
};

function compare(route: string, href: string) {
  if (href === '/') return route === href;

  return route.startsWith(href);
}

const NavLink = ({ href, title, setControlRef }: NavLinkProps) => {
  const { route } = useRouter();

  return (
    <Link
      href={href}
      className={clsx(classes.link, compare(route, href) && classes.linkActive)}
      ref={setControlRef(href)}
    >
      <Box py={8} px={16}>
        <Text size="md" c="black-300">
          {title}
        </Text>
      </Box>
    </Link>
  );
};

export default NavLink;
