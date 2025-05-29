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
    <form onSubmit={submit} className="flex w-full max-w-[400px] flex-col gap-10 transition-all">
      <div className={cn('flex flex-col items-center justify-center w-full h-full gap-2')}>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="!w-full">
            <label className="text-[0.875rem] text-[#57575b] mb-2">First Name *</label>
            <Input
              wrpClassName="!w-full !max-w-full"
              {...register('firstName')}
              error={errors?.firstName?.message}
              placeholder={'John'}
              required={true}
            />
          </div>
          <div className="!w-full">
            <label className="text-[0.875rem] text-[#57575b] mb-2">Last Name *</label>
            <Input
              wrpClassName="!w-full !max-w-full"
              placeholder={'Doe'}
              required={true}
              {...register('lastName')}
              error={errors?.lastName?.message}
            />
          </div>
        </div>
        <div className="!w-full">
          <label className="text-[0.875rem] text-[#57575b] mb-2">Email Address *</label>
          <Input
            {...register('email')}
            placeholder={'Enter your email'}
            type="email"
            autoCorrect="off"
            autoCapitalize="none"
            required={true}
            error={errors?.email?.message}
            label="Email Address *"
            wrpClassName="!w-full !max-w-full"
          />
        </div>
        <div className="!w-full">
          <label className="text-[0.875rem] text-[#57575b] mb-2">Password *</label>
          <Input
            {...register('password')}
            placeholder={'********'}
            type="password"
            required={true}
            error={errors?.password?.message}
            wrpClassName="!w-full !max-w-full"
          />
        </div>
        <div className="!w-full">
          <label className="text-[0.875rem] text-[#57575b] mb-2">Confirm Password *</label>
          <Input
            {...register('confirmPassword')}
            placeholder={'********'}
            type="password"
            required={true}
            error={errors?.confirmPassword?.message}
            wrpClassName="!w-full !max-w-full"
          />
        </div>
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
