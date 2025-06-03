'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo, useState } from 'react';
import cn from 'classnames';
import { Button } from 'components/ui/Button';

import { FaPlay } from 'react-icons/fa';
import { BsSoundwave } from 'react-icons/bs';

type PageProps = unknown;

const DATA = [
  {
    id: 1,
    icon: <FaPlay />,
    text: 'Female voice',
  },
  {
    id: 2,
    icon: <BsSoundwave />,
    text: 'Male voice',
  },
];

const Page: FC<PageProps> = memo(() => {
  const [active, setActive] = useState(DATA[0]);

  return (
    <MobileContainer
      showHeader
      className="flex flex-col gap-4"
      // bgClassName='bg-[url("/images/assets/6.png")] bg-cover bg-left-top bg-no-repeat'
      isStackScreen
    >
      <Image
        alt=""
        src="/images/assets/2.png"
        width={0}
        height={0}
        className="w-full h-full max-w-[170px] max-h-[203px] mx-auto"
      />
      <div className="h-10" />
      <p className="text-center font-bold text-[1.25rem] text=[#e7e8f1]">Your nightly guide</p>
      <p className="text-center text-[0.75rem] text-[#ccd0df]">
        Each voice is carefully tuned to support your transformation.
      </p>
      <div className="h-10" />
      <div className="flex flex-col gap-4">
        {DATA.map(a => (
          <div
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
              <span className="bg-[#201f24] w-9 h-9 text-[0.875rem] shrink-0 rounded-full p-3 flex items-center justify-center">
                {a.icon}
              </span>
              <p>{a.text}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-[0.875rem] text-[#ccd0df]">
        Which one feels most comforting to you?
      </p>
      <Button fullWidth theme="gradient" className="mt-auto" href="/dashboard">
        Save
      </Button>
    </MobileContainer>
  );
});

export default Page;
