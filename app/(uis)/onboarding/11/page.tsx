'use client';
import { Input } from 'components/formElements/Input';
import { Select } from 'components/formElements/Select';
import { MobileContainer } from 'components/lib/MobileContainer';
import { Progress } from 'components/ui/Progress';
import { Button } from 'components/ui/Button';
import Link from 'next/link';
import { FC, memo } from 'react';

import { HiOutlineSpeakerWave } from 'react-icons/hi2';

type PageProps = unknown;

const number = 11;

const DATA = {
  title: `Question #${number}`,
  text: 'Personalize your experience',
  text_2: `What should we call you?`,
  text_3: `This name will be softly woven into your first track.`,
};

const progress = (number / 11) * 100;

const Page: FC<PageProps> = memo(() => {
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
        <p className="text-[1.25rem] font-medium opacity-80 text-center">{DATA.title}</p>
        <p className="text-[1.25rem] text-[#c5cce1] text-center mx-auto max-w-[70%]">{DATA.text}</p>
        <div>
          <p className="text-[1.25rem] text-[#c5cce1] text-center mx-auto max-w-[70%] break-words">
            {DATA.text_2}
          </p>
          <p className="text-[1.25rem] text-[#c5cce1] text-center mx-auto max-w-[70%] break-words">
            {DATA.text_3}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            className="!bg-none !bg-transparent"
            wrpClassName="!bg-none !bg-transparent"
            wrpInputClassName="!bg-none !bg-transparent"
            fullWidth
            placeholder="First Name Only"
          />
          {typeof window !== 'undefined' && (
            <>
              <Select
                classNames={{
                  control: () => '!bg-none !bg-transparent',
                }}
                className="!bg-none !bg-transparent"
                fullWidth
                placeholder="Age"
              />
              <Select
                classNames={{
                  control: () => '!bg-none !bg-transparent',
                }}
                className="!bg-none !bg-transparent"
                fullWidth
                placeholder="Gender"
              />
            </>
          )}
        </div>
        <Button pill fullWidth theme="outline" href={`/`}>
          Next
        </Button>
      </div>
      <Link href="/" className="mx-auto mt-auto opacity-80">
        Skip test
      </Link>
    </MobileContainer>
  );
});

export default Page;
