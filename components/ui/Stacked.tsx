import cn from 'classnames';
import { FC, PropsWithChildren, memo } from 'react';

type StackedProps = {
  className?: string;
};

export const Stacked: FC<PropsWithChildren<StackedProps>> = memo(({ children, className }) => {
  return <div className={cn('flex items-center -space-x-4', className)}>{children}</div>;
});
