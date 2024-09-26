import { useEffect } from 'react';
import React, { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Center, Stack, Text } from '@mantine/core';

import { useCartContext } from 'contexts/cart.context';

import { RoutePath } from 'routes';
import queryClient from 'query-client';

const Success: NextPage = () => {
  const { loading, clearCart } = useCartContext();

  useEffect(() => {
    if (!loading) {
      // We are getting redirected here from api after successful order, so it is time to clean up
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  }, [loading]);

  return (
    <Center mt={70}>
      <Stack gap={32} align="center">
        <Image src="/images/success.png" width={56} height={56} alt="Party popper" quality={95} />
        <Stack gap={16} align="center">
          <Text fz="24px" lh="39px" fw="bold" c="black-600">
            Payment Successfull
          </Text>
          <Text size="md" c="black-400">
            Hooray, you have completed your payment!
          </Text>
        </Stack>
        <Button component={Link} href={RoutePath.History}>
          Back to cart
        </Button>
      </Stack>
    </Center>
  );
};

export default Success;
