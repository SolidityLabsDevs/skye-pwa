'use client';
import { FC, memo, useState } from 'react';
import cn from 'classnames';

type DaysProps = unknown;

const DATA = [
  {
    id: 1,
    title: 'S',
  },
  {
    id: 2,
    title: 'M',
  },
  {
    id: 3,
    title: 'T',
  },
  {
    id: 4,
    title: 'W',
  },
  {
    id: 5,
    title: 'T',
  },
  {
    id: 6,
    title: 'F',
  },
  {
    id: 7,
    title: 'S',
  },
];

export const WeekDays2: FC<DaysProps> = memo(() => {
  const [active, setActive] = useState<{ id: number; title: string } | undefined>(DATA[0]);

  return (
    <div className="flex flex-row gap-1">
      {DATA.map(item => (
        <button
          onClick={() => setActive(item)}
          key={item?.id}
          className={cn('p-px rounded-full shrink-0 w-5 h-5 flex items-center justify-center', {
            'bg-none bg-transparent border border-solid border-[#a1a4b2]': active?.id !== item?.id,
            'bg-[#3f414e]  border border-solid border-[#3f414e]': active?.id === item?.id,
          })}
        >
          <p className="text-[0.438rem] font-medium text-[#a1a4b2]">{item.title}</p>
        </button>
      ))}
    </div>
  );
});
