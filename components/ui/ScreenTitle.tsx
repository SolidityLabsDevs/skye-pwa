import cn from 'classnames';
import { FC, memo, ReactNode } from 'react';
import Link from 'next/link';

type ScreenTitleProps = {
  title?: ReactNode;
  text?: ReactNode;
  linkTitle?: string;
  className?: string;
  href?: string;
};

export const ScreenTitle: FC<ScreenTitleProps> = memo(
  ({ title, text, href = '#', linkTitle, className }) => {
    return (
      <div className={cn('mb-5 h-max', className)}>
        <div className="flex flex-row justify-between gap-5">
          {title && <div className="text-[1.25rem] font-bold text-defaultText">{title}</div>}
          {linkTitle && (
            <Link className="font-bold text-primary" href={href}>
              {linkTitle}
            </Link>
          )}
        </div>
        {text && (
          <div
            className={cn('text-[0.875rem] font-semibold text-defaultText', {
              'mt-2': !!title,
            })}
          >
            {text}
          </div>
        )}
      </div>
    );
  }
);
