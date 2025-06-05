'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import { Progress } from 'components/ui/Progress';
import { Button } from 'components/ui/Button';
import Link from 'next/link';
import { FC, memo, useState } from 'react';

import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { CustomSlider } from 'components/formElements/CustomSlider';
import { useRouter } from 'next/navigation';
import { QUESTIONS } from 'constants/questions';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { API } from 'constants/apiUrls';
import { apiError } from 'helpers';
import { toast } from 'react-toastify';

type PageProps = unknown;

const number = 3;
const question = QUESTIONS[number - 1];
const progress = (number / 11) * 100;

const Page: FC<PageProps> = memo(() => {
  const router = useRouter();
  const [value, setValue] = useState(5);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios.post(API.USER.ONBOARDING.INDEX, { db_prop: question.db_prop, value: String(value) }),
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
      <div className="flex flex-col items-center gap-8 mb-8">
        <p className="text-[1.25rem] font-medium opacity-80 text-center">{question.title}</p>
        <p className="text-[1.25rem] text-[#c5cce1] text-center mx-auto max-w-[70%]">
          {question.text}
        </p>
        <div className="flex flex-col items-center w-full gap-4">
          <CustomSlider
            min={1}
            max={10}
            leftLabel="Critical"
            rightLabel="Supportive"
            value={value}
            onChange={v => setValue(v)}
          />
        </div>
        <Button pill fullWidth loading={isPending} theme="outline" onClick={() => mutate()}>
          Next
        </Button>
      </div>
      <Link href="/dashboard" className="mx-auto mt-auto opacity-80">
        Skip test
      </Link>
    </MobileContainer>
  );
});

export default Page;
