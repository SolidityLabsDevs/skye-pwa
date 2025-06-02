'use client';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FC, memo } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { API } from 'constants/apiUrls';
import { Input } from 'components/formElements/Input';
import { appConfig } from 'config/appConfig';
import { Button } from 'components/ui/Button';
import { apiError } from 'helpers';
import { SignInSchema, TSignInSchema } from 'app/api/auth/sign-in/schemas';
// import { useModalStore } from 'stores';

type SignInFormProps = unknown;

export const SignInForm2: FC<SignInFormProps> = memo(() => {
  // const showModal = useModalStore(state => state.show);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TSignInSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SignInSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return axios.post(API.AUTH.SIGN_IN, getValues());
    },
    onError: (err: AxiosError) => {
      toast.error(apiError(err));
    },
    onSuccess: res => {
      if (res?.data?.Location) {
        window.location.href = res?.data?.Location;
      } else {
        window.location.href = '/dashboard';
      }
    },
  });

  const submit = handleSubmit(() => {
    mutate();
  });

  return (
    <form onSubmit={submit} className="flex flex-col w-full gap-10 transition-all">
      <div className={cn('flex flex-col items-center justify-center w-full h-full gap-2')}>
        <Input
          label="Email"
          {...register('email')}
          placeholder={'Enter your email'}
          type="email"
          autoCorrect="off"
          autoCapitalize="none"
          required={true}
          error={errors?.email?.message}
          fullWidth
        />
        <Input
          label="Password"
          {...register('password')}
          placeholder={'********'}
          type="password"
          required={true}
          error={errors?.password?.message}
          fullWidth
        />
        {appConfig.ENABLE_PASSWORD_RESET && (
          <button
            type="button"
            // onClick={() => showModal('ResetPassword', {})}
            className="text-primary ml-auto text-[0.875rem] block"
          >
            Reset password
          </button>
        )}
        <Button
          fullWidth
          loading={isPending}
          onClick={handleSubmit(() => {
            mutate();
          })}
          className="mt-4"
          theme="primary"
          pill
          type="submit"
        >
          Sign in
        </Button>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 text-defaultText">
        <p>Don`t have an account?</p>{' '}
        <Link className="text-primary" href="/sign-up">
          Create Account
        </Link>
      </div>
    </form>
  );
});
