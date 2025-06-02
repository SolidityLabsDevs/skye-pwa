'use client';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FC, memo } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { API } from 'constants/apiUrls';
import { Input } from 'components/formElements/Input';
import { Button } from 'components/ui/Button';
import { apiError } from 'helpers';
import { SignUpSchema, TSignUpSchema } from 'app/api/auth/sign-up/schemas';
// import { useModalStore } from 'stores';

type SignInFormProps = {
  goNext?: () => void;
};

export const SignUpForm2: FC<SignInFormProps> = memo(() => {
  // const showModal = useModalStore(state => state.show);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return axios.post(API.AUTH.SIGN_UP, getValues());
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
      // goNext?.()
    },
  });

  const submit = handleSubmit(() => {
    mutate();
  });

  return (
    <form onSubmit={submit} className="flex flex-col w-full gap-10 transition-all">
      <div className={cn('flex flex-col items-center justify-center w-full h-full gap-2')}>
        <Input
          wrpClassName="!w-full !max-w-full"
          {...register('name')}
          error={errors?.name?.message}
          placeholder={'Name'}
          required={true}
          fullWidth
          label="Name"
        />
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
          label={'Password'}
          {...register('password')}
          placeholder={'********'}
          type="password"
          required={true}
          error={errors?.password?.message}
          wrpClassName="!w-full !max-w-full"
          fullWidth
        />
        <Input
          label={'Repeat Password'}
          {...register('confirmPassword')}
          placeholder={'********'}
          type="password"
          required={true}
          error={errors?.confirmPassword?.message}
          fullWidth
        />
      </div>
      <Button
        loading={isPending}
        onClick={handleSubmit(() => {
          mutate();
        })}
        theme="primary"
        big
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
});
