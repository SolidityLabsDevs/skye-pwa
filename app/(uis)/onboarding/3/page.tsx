'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import { Progress } from 'components/ui/Progress';
import { Button } from 'components/ui/Button';
import Link from 'next/link';
import { FC, memo, useState } from 'react';

import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { CustomSlider } from 'components/formElements/CustomSlider';

type PageProps = unknown;

const number = 3;

const DATA = {
  title: `Question #${number}`,
  text: 'When your inner voice speaks to you is it kind or critical?',
};

const progress = (number / 11) * 100;

const Page: FC<PageProps> = memo(() => {
  const [value, setValue] = useState(5);

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
        <div className="flex flex-col gap-4">
          <CustomSlider
            min={1}
            max={10}
            leftLabel="Critical"
            rightLabel="Supportive"
            value={value}
            onChange={v => setValue(v)}
          />
        </div>
        <Button pill fullWidth theme="outline" href={`/onboarding/${number + 1}`}>
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
