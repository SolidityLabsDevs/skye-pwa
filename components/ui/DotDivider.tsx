import { FC, memo } from 'react';
import cn from 'classnames';

type DotDividerProps = {
  className?: string;
};

export const DotDivider: FC<DotDividerProps> = memo(({ className }) => {
  return <span className={cn('text-[#D9D9D9]', className)}>•</span>;
});
