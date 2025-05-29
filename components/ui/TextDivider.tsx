'use client';
import { FC, PropsWithChildren, memo } from 'react';
import cn from 'classnames';

type TextDividerProps = {
  className?: string;
};

export const TextDivider: FC<PropsWithChildren<TextDividerProps>> = memo(
  ({ children, className }) => {
    return (
      <div className={cn('relative flex justify-center items-center my-5', className)}>
        <div className="w-1/3 border-t shrink-0 border-default"></div>
        <span className="mx-4 text-default">{children}</span>
        <div className="w-1/3 border-t shrink-0 border-default"></div>
      </div>
    );
  }
);
