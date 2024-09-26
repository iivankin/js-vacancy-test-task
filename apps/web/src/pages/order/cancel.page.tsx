import React, { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Center, Stack, Text } from '@mantine/core';

import { RoutePath } from 'routes';

const Cancel: NextPage = () => (
  <Center mt={70}>
    <Stack gap={32} align="center">
      <Image src="/images/fail.png" width={56} height={56} alt="Cross mark" quality={95} />
      <Stack gap={16} align="center">
        <Text fz="24px" lh="39px" fw="600" c="black-600">
          Payment Failed
        </Text>
        <Text size="md" c="black-400">
          Sorry, your payment failed.
          <br /> Would you like to try again?
        </Text>
      </Stack>
      <Button component={Link} href={RoutePath.Cart}>
        Back to cart
      </Button>
    </Stack>
  </Center>
);

export default Cancel;
