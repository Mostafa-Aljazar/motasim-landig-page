'use client';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import {
  Button,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { AUTH_ROUTES, MANAGER_ROUTES_fUNC } from '@/constants/routes';
import Link from 'next/link';
import { loginSchema, loginType } from '@/validation/auth/loginSchema';
import { useMutation } from '@tanstack/react-query';
import { login, loginProps } from '@/actions/auth/login';
import { loginResponse } from '@/@types/auth/loginResponse.type';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { LOCALSTORAGE_SESSION_KEY } from '@/constants/sessionKey';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

  // Define the form schema
  const form = useForm<loginType>({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: zodResolver(loginSchema),
  });

  const loginMutation = useMutation<loginResponse, Error, loginProps>({
    mutationFn: login,
    onSuccess: (data) => {
      if (Number(data.status) == 200) {
        notifications.show({
          title: 'مرحبا بك',
          message: 'تم تسجيل الدخول بنجاح',
          color: 'grape',
          position: 'top-left',
          withBorder: true,
          loading: true,
        });

        // Save the login data to local storage
        localStorage.setItem(LOCALSTORAGE_SESSION_KEY, JSON.stringify(data));

        router.push(MANAGER_ROUTES_fUNC(data.user.id).PROFILE);

        return;
      } else {
        form.reset();
        throw new Error(data.error || 'فشل في تسجيل الدخول');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || error?.message;
      setError(errorMessage);

      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleSubmit = form.onSubmit((values: loginType) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  });

  return (
    <Stack
      align='center'
      gap={40}
      bg={'white'}
      pt={{ base: 0, lg: 64 }}
      pb={20}
      h={'100%'}
      w={{ base: '100%', lg: 550 }}
      className='!rounded-xl'
    >
      <Text fw={500} fz={{ base: 28, md: 36 }} ta={'center'}>
        تسجيل الدخول
      </Text>

      <Stack justify='center' align='center' gap={20}>
        <form
          className='relative flex flex-col items-center gap-3'
          onSubmit={handleSubmit}
        >
          <LoadingOverlay
            visible={loginMutation.isPending}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 0.3 }}
          />

          <TextInput
            type='email'
            label={
              <Text fw={400} c={'#817C74'} fz={16}>
                البريد الاكتروني
              </Text>
            }
            placeholder={'ادخل البريد الاكتروني'}
            size='md'
            w={{ base: 343, md: 400 }}
            className='!border-second !border-w-1 focus:!border-none !outline-none'
            key={form.key('email')}
            {...form.getInputProps('email')}
            classNames={{
              input: '!text-dark !font-medium !text-sm',
              error: '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
            }}
          />

          <PasswordInput
            type='password'
            label={
              <Text fw={400} c={'#817C74'} fz={16}>
                كلمة المرور
              </Text>
            }
            placeholder={'ادخل كلمة المرور'}
            size='md'
            w={{ base: 343, md: 400 }}
            className='!border-second !border-w-1 focus:!border-none !outline-none'
            key={form.key('password')}
            {...form.getInputProps('password')}
            classNames={{
              input: '!text-dark !font-medium !text-sm',
              error: '!w-full !text-end !text-[#FD6265] !font-normal !text-sm',
            }}
          />

          <Button
            // loading={loginMutation.isPending}
            type='submit'
            mt={32}
            fz={20}
            fw={500}
            c={'white'}
            w={228}
            className={`!shadow-lg max-lg:!mt-10 ${
              !form.getValues().password || !form.getValues().email
                ? '!bg-primary/70'
                : '!bg-primary'
            }`}
            disabled={!form.getValues().password || !form.getValues().email}
          >
            دخول
          </Button>
          {error ? (
            <Text fw={'500'} mt={'sm'} size='sm' ta='center' c={'red'}>
              {error}
            </Text>
          ) : null}
        </form>
      </Stack>
    </Stack>
  );
}
