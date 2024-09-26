import { useRef, useState } from 'react';
import React, { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Alert, Box, Button, Flex, Group, NumberInput, Stack, TextInput, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAlertCircle } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { productApi } from 'resources/product';

import { CoverImage } from 'public/images';

import { handleApiError } from 'utils';

import { createSchema } from 'schemas';
import { CreateParams } from 'types';

import classes from './style.module.css';

type CreateParamsWithImage = CreateParams & { file: File };

const NewProduct: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
  } = useForm<CreateParamsWithImage>({
    resolver: zodResolver(createSchema.extend({ file: z.instanceof(File) })),
  });

  const { mutate, isPending } = productApi.useCreateProduct();

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState('');

  const handleUploadedFile = (file: File) => {
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
  };

  const onUpload = () => {
    hiddenInputRef.current?.click();
  };

  const onSubmit = (data: CreateParamsWithImage) => {
    const body = new FormData();
    body.append('file', data.file, data.file.name);
    body.append('title', data.title);
    body.append('price', data.price.toString());
    body.append('quantity', data.quantity.toString());

    mutate(body, {
      onError: (e) => handleApiError(e, setError),
      onSuccess: () => {
        showNotification({
          title: 'Success',
          message: 'Product has been succesfully created.',
          color: 'green',
        });

        // https://github.com/orgs/react-hook-form/discussions/7589
        reset({
          title: '',
          file: null as never,
          price: NaN,
          quantity: NaN,
        });
        setPreview('');
      },
    });
  };

  return (
    <>
      <Head>
        <title>New product</title>
      </Head>
      <Stack gap={20} mt={10}>
        <Title order={3} fz="xl" c="black-600">
          Create new product
        </Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={20} maw={694}>
            <Group gap={16}>
              <Box w={180} h={180} className={classes.image}>
                {preview ? <Image src={preview} alt="Product" width={180} height={180} /> : <CoverImage />}
              </Box>
              <Button variant="outline" onClick={onUpload}>
                Upload Photo
              </Button>
              <Controller
                name="file"
                rules={{ required: true }}
                control={control}
                render={({ field: { name, onBlur, onChange, ref } }) => (
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name={name}
                    onBlur={onBlur}
                    hidden
                    className={classes.hidden}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;

                      onChange(file);
                      handleUploadedFile(file);
                    }}
                    ref={(e) => {
                      ref(e);
                      hiddenInputRef.current = e;
                    }}
                  />
                )}
              />
            </Group>
            {errors.file && (
              <Alert icon={<IconAlertCircle />} color="red">
                {errors.file.message}
              </Alert>
            )}
            <TextInput
              {...register('title')}
              label="Title of the product"
              placeholder="Enter title of the product..."
              error={errors.title?.message}
            />
            <Controller
              name="price"
              control={control}
              render={({ field: { name, onBlur, onChange, value, ref } }) => (
                <NumberInput
                  onChange={(val) => {
                    onChange(val);
                  }}
                  label="Price"
                  placeholder="Enter price of the product..."
                  error={errors.price?.message}
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field: { name, onBlur, onChange, value, ref } }) => (
                <NumberInput
                  onChange={(val) => {
                    onChange(val);
                  }}
                  allowDecimal={false}
                  label="Quantity"
                  placeholder="Enter quantity of the product..."
                  error={errors.quantity?.message}
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </Stack>

          <Flex maw={694} justify="flex-end">
            <Button type="submit" loading={isPending} mt={28}>
              Upload Product
            </Button>
          </Flex>
        </form>
      </Stack>
    </>
  );
};

export default NewProduct;
