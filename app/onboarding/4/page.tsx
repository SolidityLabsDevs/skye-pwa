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

const number = 4;

const DATA = {
  title: `Question #${number}`,
  text: 'Which of these patterns do you notice most in your thoughts? ',
  text_2: 'Select 2',
  answers: [
    {
      id: 1,
      text: 'Overthinking',
    },
    {
      id: 2,
      text: 'Avoiding discomfort',
    },
    {
      id: 3,
      text: 'Holding back my voice',
    },
    {
      id: 4,
      text: 'Shame spirals',
    },
    {
      id: 5,
      text: 'Giving too much',
    },
    {
      id: 6,
      text: 'Unmotivated',
    },
  ],
};

const progress = (number / 11) * 100;

const Page: FC<PageProps> = memo(() => {
  const [active, setActive] = useState<{ id: number; text: string }[]>([]);

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
        <p className="text-[1.25rem] text-[#c5cce1] text-center mx-auto max-w-[70%]">
          {DATA.text_2}
        </p>
        <div className="flex flex-col gap-4">
          {DATA.answers.map((a, idx) => {
            const selected = active?.find(item => item?.id === a.id);
            const selectedIndex = active?.findIndex(item => item?.id === a.id);
            return (
              <button
                onClick={() => {
                  if (selected) {
                    setActive(prev => {
                      const arr = [...prev];
                      arr.splice(selectedIndex, 1);
                      return arr;
                    });
                  } else {
                    if (active?.length === 2) {
                      setActive(prev => {
                        const arr = [...prev];
                        arr.splice(0, 1);
                        return [...arr, a];
                      });
                    } else {
                      setActive(prev => {
                        const arr = [...prev, a];
                        return arr;
                      });
                    }
                  }
                }}
                key={a.id}
                className={cn('p-px rounded-[9px]', {
                  'bg-default': selected?.id !== a.id,
                  '[background:linear-gradient(to_right,_#47326B_0%,_#914372_50%,_#AC714F_100%)]':
                    selected?.id === a.id,
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
            );
          })}
        </div>
        {active?.length === 2 && (
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
