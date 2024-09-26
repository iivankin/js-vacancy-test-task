import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Anchor, Button, Group, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { accountApi } from 'resources/account';

import { handleApiError } from 'utils';

import { RoutePath } from 'routes';

import { signUpSchema } from 'schemas';
import { SignUpParams } from 'types';

import Checkbox from './components/Checkbox';

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    done: false,
  },
  {
    title: 'Must contain lover case and capital letters',
    done: false,
  },
];

const SignUp: NextPage = () => {
  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({ resolver: zodResolver(signUpSchema) });

  const passwordValue = watch('password', '').trim();

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 8 && passwordValue.length <= 50;
    updatedPasswordRulesData[1].done = /\d/.test(passwordValue);
    updatedPasswordRulesData[2].done = /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isPending: isSignUpPending } = accountApi.useSignUp();

  const onSubmit = (data: SignUpParams) =>
    signUp(data, {
      onError: (e) => handleApiError(e, setError),
    });

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Stack w={408} gap={32}>
        <Stack gap={32}>
          <Title order={2} c="black-600">
            Sign Up
          </Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                {...register('email')}
                label="Email Address"
                placeholder="Enter email Address"
                error={errors.email?.message}
              />

              <PasswordInput
                {...register('password')}
                label="Password"
                placeholder="Enter password"
                error={errors.password?.message}
              />

              <Stack gap={8}>
                {passwordRulesData.map((ruleData) => (
                  <Checkbox key={ruleData.title} label={ruleData.title} checked={ruleData.done} />
                ))}
              </Stack>
            </Stack>

            <Button type="submit" loading={isSignUpPending} fullWidth mt={32}>
              Sign Up
            </Button>
          </form>
        </Stack>

        <Group justify="center" gap={12} c="black-600">
          Have an account?
          <Anchor component={Link} href={RoutePath.SignIn} c="blue-400">
            Sign In
          </Anchor>
        </Group>
      </Stack>
    </>
  );
};

export default SignUp;
