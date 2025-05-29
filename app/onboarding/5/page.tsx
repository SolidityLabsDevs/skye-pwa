'use client';
import cn from 'classnames';
import { MobileContainer } from 'components/lib/MobileContainer';
import { Progress } from 'components/ui/Progress';
import { Button } from 'components/ui/Button';
import Link from 'next/link';
import { FC, memo, useState } from 'react';

import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

type PageProps = unknown;

const number = 5;

const DATA = {
  title: `Question #${number}`,
  text: 'Which of these patterns do you notice most in your thoughts?',
  answers: [
    {
      id: 1,
      text: 'Deeply connected',
    },
    {
      id: 2,
      text: 'I wish i felt it more',
    },
    {
      id: 3,
      text: 'Not at all',
    },
    {
      id: 4,
      text: 'I’m not sure',
    },
    {
      id: 5,
      text: 'None of these Apply',
    },
  ],
};

const progress = (number / 11) * 100;

const Page: FC<PageProps> = memo(() => {
  const [active, setActive] = useState<{ id: number; text: string } | undefined>(undefined);

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
          {DATA.answers.map((a, idx) => (
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
          <Button pill fullWidth theme="outline" href={`/onboarding/${number + 1}`}>
            Next
          </Button>
        )}
      </div>
      <Link href="/" className="mx-auto mt-auto opacity-80">
        Skip test
      </Link>
    </MobileContainer>
  );
});

export default Page;
