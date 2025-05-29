'use client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Input } from 'components/formElements/Input';
import { Button } from 'components/ui/Button';
import { CardStack } from 'components/ui/CardStack';
import { API } from 'constants/apiUrls';
import { FC, memo, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiError } from 'helpers';
import { CodeInput } from 'components/formElements/CodeInput';
import { useSearchParams } from 'next/navigation';

type AuthWithEmailCodeFormProps = unknown;

const schema = z.object({
  email: z.string().email(),
  value: z.string(),
});

const cardContentClassName = 'flex flex-col items-center justify-center gap-4';

export const AuthWithEmailCodeForm: FC<AuthWithEmailCodeFormProps> = memo(() => {
  const [activeIdx, setActiveIdx] = useState(0);
  const searchParams = useSearchParams();
  const backUrl = searchParams.get('backUrl') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      value: '',
    },
    resolver: zodResolver(schema),
  });

  const { mutate: signIn, isPending: signInPending } = useMutation({
    mutationFn: () =>
      axios.post(API.AUTH.SIGN_IN, { code: +getValues('value'), email: getValues('email') }),
    onError: (err: AxiosError) => {
      setActiveIdx(0);
      setValue('value', '');
      toast.error(apiError(err));
    },
    onSuccess: res => {
      if (res?.data?.Location) {
        window.location.href = res?.data?.Location;
      } else if (backUrl) {
        window.location.href = backUrl;
      } else {
        window.location.href = '/dashboard';
      }
    },
  });

  const { mutate: getCode, isPending: getCodePending } = useMutation({
    mutationFn: () => axios.post(API.ACCOUNT.GET_CODE, { email: getValues('email') }),
    onError: (err: AxiosError) => {
      toast.error(apiError(err));
    },
    onSuccess: () => {
      setActiveIdx(1);
    },
  });

  const loading = getCodePending || signInPending;

  return (
    <CardStack
      activeIdx={activeIdx}
      setActiveIdx={setActiveIdx}
      withBorder={false}
      disabled={loading}
      items={[
        {
          contentClassName: cardContentClassName,
          children: (
            <>
              <Input
                placeholder={'Email'}
                type="email"
                {...register('email')}
                error={errors?.email?.message}
              />
              <Button
                loading={loading}
                fullWidth
                onClick={handleSubmit(() => {
                  getCode();
                })}
              >
                Get auth code
              </Button>
            </>
          ),
        },
        {
          contentClassName: cardContentClassName,
          children: (
            <>
              <CodeInput disabled={loading} onComplete={v => setValue('value', v)} />
              <Button
                fullWidth
                onClick={handleSubmit(() => {
                  signIn();
                })}
                loading={loading}
              >
                Submit
              </Button>
            </>
          ),
        },
      ]}
    />
  );
});
