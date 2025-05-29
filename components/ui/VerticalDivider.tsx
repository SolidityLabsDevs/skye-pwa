import { FC, memo } from 'react';
import cn from 'classnames';

type VerticalDividerProps = {
  className?: string;
};

export const VerticalDivider: FC<VerticalDividerProps> = memo(({ className }) => {
  return <span className={cn('font-thin text-black/25', className)}>|</span>;
});
