'use client';
import { Progress } from 'components/ui';
import { FC, memo } from 'react';

type DaysChallengeProps = unknown;

export const DaysChallenge: FC<DaysChallengeProps> = memo(() => {
  return (
    <div className="flex flex-row items-center gap-2">
      <p className="text-[#a1a4b2] text-[0.875rem]">30 Day Challenge</p>
      <Progress
        progress={2}
        className="flex-1"
        barClassName="[background:linear-gradient(to_right,_#47326B_0%,_#914372_50%,_#AC714F_100%)]"
      />
      <p className="text-[#a1a4b2] text-[0.875rem]">100%</p>
    </div>
  );
});
