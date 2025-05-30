'use client';
import { FC, memo, useState } from 'react';
import cn from 'classnames';
import { HorizontalSection } from 'components/ui/HorizontalSection';

type DaysProps = unknown;

export const Days: FC<DaysProps> = memo(() => {
  const [active, setActive] = useState(0);

  return (
    <HorizontalSection className="gap-2">
      {new Array(30).fill(null).map((_, idx) => (
        <button
          onClick={() => setActive(idx)}
          key={idx}
          className={cn('p-px rounded-[9px] shrink-0', {
            'bg-default': active !== idx,
            '[background:linear-gradient(to_right,_#47326B_0%,_#914372_50%,_#AC714F_100%)]':
              active === idx,
          })}
        >
          <div
            style={{ background: 'rgba(39, 37, 45, 0.8)' }}
            className={cn('flex rounded-[8px] flex-col items-center gap-4 px-4', {
              'py-1': active !== idx,
              'py-2': active === idx,
            })}
          >
            <p className="text-[#a1a4b2] text-[0.75rem]">Day</p>
            <p className="font-medium text-[1.25rem]">{idx + 1}</p>
          </div>
        </button>
      ))}
    </HorizontalSection>
  );
});
