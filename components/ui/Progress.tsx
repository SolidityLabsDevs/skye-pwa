import { FC, memo } from 'react';
import cn from 'classnames';

type ProgressProps = {
  className?: string;
  progress: number;
};

export const Progress: FC<ProgressProps> = memo(({ progress, className }) => {
  return (
    <div className={cn('bg-default rounded-[12px] h-[10px]', className)}>
      <div className="h-full rounded-[12px]  bg-defaultText" style={{ width: `${progress}%` }} />
    </div>
  );
});
