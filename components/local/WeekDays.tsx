'use client';
import { FC, memo, useState } from 'react';
import cn from 'classnames';
import { HorizontalSection } from 'components/ui/HorizontalSection';

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

export const WeekDays: FC<DaysProps> = memo(() => {
  const [active, setActive] = useState<{ id: number; title: string } | undefined>(DATA[0]);

  return (
    <HorizontalSection className="justify-center gap-2">
      {DATA.map(item => (
        <button
          onClick={() => setActive(item)}
          key={item?.id}
          className={cn('p-px rounded-[9px] shrink-0 w-12', {
            'bg-default': active?.id !== item?.id,
            '[background:linear-gradient(to_right,_#47326B_0%,_#914372_50%,_#AC714F_100%)]':
              active?.id === item?.id,
          })}
        >
          <div
            style={{ background: 'rgba(39, 37, 45, 0.8)' }}
            className={cn('flex rounded-[8px] flex-col items-center gap-4 p-4', {})}
          >
            <p className="text-[1.25rem] font-medium">{item.title}</p>
          </div>
        </button>
      ))}
    </HorizontalSection>
  );
});
