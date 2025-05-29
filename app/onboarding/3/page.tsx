'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import { Progress } from 'components/ui/Progress';
import { Button } from 'components/ui/Button';
import Link from 'next/link';
import { FC, memo, useState } from 'react';

import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
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
    <MobileContainer className='flex-1 bg-[url("/images/assets/5.png")] bg-cover bg-center flex flex-col justify-center'>
      <div className="flex flex-row items-center justify-between gap-4 p-4">
        <Link href="/">
          <MdOutlineKeyboardArrowLeft size={24} />
        </Link>
        <div className="flex-1">
          <Progress progress={progress} />
        </div>
        <HiOutlineSpeakerWave size={24} />
      </div>
      <div className="flex flex-col gap-8 px-4 mb-8">
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
