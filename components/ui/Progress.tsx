import { FC, memo } from 'react';
import cn from 'classnames';

type ProgressProps = {
  className?: string;
  barClassName?: string;
  progress: number;
};

export const Progress: FC<ProgressProps> = memo(({ progress, className, barClassName }) => {
  return (
    <div className={cn('bg-default rounded-[12px] h-[10px]', className)}>
      <div
        className={cn('h-full rounded-[12px]  bg-defaultText', barClassName)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});
