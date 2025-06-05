'use client';
import cn from 'classnames';
import { MobileContainer } from 'components/lib/MobileContainer';
import { Progress } from 'components/ui/Progress';
import { Button } from 'components/ui/Button';
import Link from 'next/link';
import { FC, memo, useState } from 'react';

import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { QUESTIONS } from 'constants/questions';
import { API } from 'constants/apiUrls';
import { toast } from 'react-toastify';
import { apiError } from 'helpers';
import { useRouter } from 'next/navigation';

type PageProps = unknown;

const number = 1;
const question = QUESTIONS[number - 1];
const progress = (number / 11) * 100;

const Page: FC<PageProps> = memo(() => {
  const router = useRouter();

  const [active, setActive] = useState<(typeof question.answers)[number] | undefined>(undefined);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios.post(API.USER.ONBOARDING.INDEX, { db_prop: question.db_prop, value: active?.id }),
    onError: (err: AxiosError) => {
      toast.error(apiError(err));
    },
    onSuccess: () => {
      router.push(`/dashboard/user/onboarding/${number + 1}`);
    },
  });

  return (
    <MobileContainer
      bgClassName='bg-[url("/images/assets/7.png")] bg-cover bg-[position:0px,_300px] bg-left-bottom bg-no-repeat'
      className="flex flex-col justify-center flex-1"
      isStackScreen
      showHeader
      backUrl="/"
      headerScreenTitle={
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <div className="flex-1">
            <Progress progress={progress} />
          </div>
          <HiOutlineSpeakerWave size={24} />
        </div>
      }
    >
      <div className="flex flex-col gap-8 mb-8">
        <p className="text-[1.25rem] font-medium opacity-80 text-center">{question.title}</p>
        <p className="text-[1.25rem] text-[#c5cce1] text-center mx-auto max-w-[70%]">
          {question.text}
        </p>
        <div className="flex flex-col gap-4">
          {question.answers?.map((a, idx) => (
            <button
              onClick={() => setActive(a)}
              key={a.id}
              className={cn('p-px rounded-[9px]', {
                'bg-default': active?.id !== a.id,
                '[background:linear-gradient(to_right,_#47326B_0%,_#914372_50%,_#AC714F_100%)]':
                  active?.id === a.id,
              })}
            >
              <div
                style={{ background: 'rgba(32, 31, 36, 0.8)' }}
                className="flex rounded-[8px] flex-row items-center gap-3 p-4"
              >
                <span className="bg-[#201f24] w-6 h-6 text-[0.875rem] px-2.5 py-1 rounded-full shrink-0 flex items-center justify-center">
                  {idx + 1}
                </span>
                <p>{a.text}</p>
              </div>
            </button>
          ))}
        </div>
        {active?.id && (
          <Button pill fullWidth loading={isPending} theme="outline" onClick={() => mutate()}>
            Next
          </Button>
        )}
      </div>
      <Link href="/dashboard" className="mx-auto mt-auto opacity-80">
        Skip test
      </Link>
    </MobileContainer>
  );
});

export default Page;
