import React from 'react';
import Image from 'next/image';
import { ActionIcon, Badge, Button, Card, Group, Text } from '@mantine/core';

import { TrashIcon } from 'public/icons';

import { STORAGE_URL } from 'app-constants';
import { Product } from 'types';

import classes from './style.module.css';

type ProductCardProps = {
  data: Product;
  showControlButtons?: boolean;
  onRemove?: () => void;
  showBuyButton?: boolean;
  onAddToCart?: () => void;
  inCart?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  showControlButtons,
  onRemove,
  showBuyButton,
  onAddToCart,
  inCart,
}) => (
  <Card padding="md" bg="white" radius="12px" withBorder bd="1px solid black-100" w={showBuyButton ? 318 : 271}>
    <Card.Section h={showBuyButton ? 218 : 174} className={classes.img}>
      <Image
        src={`${STORAGE_URL}/images/${data.image}`}
        height={showBuyButton ? 218 : 174}
        width={showBuyButton ? 318 : 271}
        alt="Product"
      />
      {showControlButtons && (
        <>
          <ActionIcon variant="white" radius="md" w={32} h={32} className={classes.delete} onClick={onRemove}>
            <TrashIcon />
          </ActionIcon>
          {data.quantity > 0 ? (
            <Badge
              variant="light"
              color="#F79009"
              bg="#FEF4E6"
              h={24}
              px="sm"
              fz="sm"
              fw="500"
              radius="md"
              className={classes.badge}
            >
              On sale
            </Badge>
          ) : (
            <Badge
              variant="light"
              color="#17B26A"
              bg="#E8F7F0"
              h={24}
              px="sm"
              fz="sm"
              fw="500"
              radius="md"
              className={classes.badge}
            >
              Sold
            </Badge>
          )}
        </>
      )}
    </Card.Section>
    <Text size="xl" c="black-600" mt="md" fw="bold" lh="24px" className={classes.title}>
      {data.title}
    </Text>
    <Group mt="sm" justify="space-between">
      <Text size="sm" c="black-300">
        Price:
      </Text>
      <Text size="xl" lh="24px" c="black-600" fw="bold">
        ${data.price}
      </Text>
    </Group>
    {showBuyButton && (
      <Button onClick={onAddToCart} mt={22} disabled={inCart}>
        {inCart ? 'In cart' : 'Add to cart'}
      </Button>
    )}
  </Card>
);

export default ProductCard;
