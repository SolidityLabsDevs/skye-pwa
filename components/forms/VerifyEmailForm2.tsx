'use client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FC, memo, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useModalStore, useUserStore } from 'stores';
import { API } from 'constants/apiUrls';
import { Button } from 'components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { apiError } from 'helpers';
import { CodeInput } from 'components/formElements/CodeInput';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

type VerifyEmailForm2Props = {
  goPrev?: () => void;
};

const schema = z.object({
  value: z.string(),
});

export const VerifyEmailForm2: FC<VerifyEmailForm2Props> = memo(({ goPrev }) => {
  const { user, login } = useUserStore(state => state);
  const show = useModalStore(state => state.show);

  const router = useRouter();

  const { handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      email: '',
      value: '',
    },
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => axios.post(API.ACCOUNT.VERIFY_EMAIL, { value: +getValues('value') }),
    onError: (err: AxiosError) => {
      toast.error(apiError(err));
      setValue('value', '');
    },
    onSuccess: () => {
      toast.success('Your email was verified');
      login({ user: { ...user, email_verified: true } });
      show('Success', {
        text: 'Your email was verified.',
      });
      router.push('/dashboard');
    },
  });

  const { mutate: getCode, isPending: getCodePending } = useMutation({
    mutationFn: () => axios.get(API.ACCOUNT.VERIFY_EMAIL),
    onError: (err: AxiosError) => {
      toast.error(apiError(err));
    },
    onSuccess: () => {},
  });

  const loading = isPending || getCodePending;

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div className="flex w-full max-w-[400px] h-full flex-col gap-10 transition-all">
      <CodeInput disabled={loading} onComplete={v => setValue('value', v)} />
      <div className="flex flex-row flex-wrap items-center gap-1 mx-auto font-medium">
        Didn't receive the code?
        <button disabled={loading} onClick={() => getCode()} className="text-primary">
          Resend code
        </button>
      </div>
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex flex-row flex-wrap justify-between gap-4">
          <p>Step 2 of 5</p>
          <p>40% complete</p>
        </div>
        <div className="bg-[#d9d9d9] rounded-[12px] h-[10px]">
          <div className="h-[10px] rounded-[12px]  bg-primary" style={{ width: `${20}%` }} />
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <Button
          loading={isPending}
          onClick={handleSubmit(() => {
            goPrev?.();
          })}
          theme="white"
          big
        >
          <FaArrowLeft size={10} /> Back
        </Button>
        <Button
          loading={isPending}
          onClick={handleSubmit(() => {
            mutate();
          })}
          theme="primary"
          big
        >
          Next <FaArrowRight color="white" size={10} />
        </Button>
      </div>
    </div>
  );
});
