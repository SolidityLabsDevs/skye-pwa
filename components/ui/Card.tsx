import { ComponentProps, FC, PropsWithChildren, memo } from 'react';
import cn from 'classnames';

type CardProps = {
  title?: string;
  className?: string;
  contentClassName?: string;
} & ComponentProps<'div'>;

export const Card: FC<PropsWithChildren<CardProps>> = memo(
  ({ title, className, contentClassName, children, ...props }) => {
    return (
      <div
        className={cn(
          'relative rounded-[8px] border-[1px] border-solid border-default h-max w-full bg-onNeutralBg',
          className
        )}
        style={{
          boxShadow: '0px 8px 24px 0px rgba(21, 21, 22, 0.04)',
        }}
        {...props}
      >
        {title && (
          <>
            <div className="p-[16px] text-defaultText">{title}</div>
            <hr className="h-px border-0 bg-default" />
          </>
        )}
        <div className={cn('p-[16px]', contentClassName)}>{children}</div>
      </div>
    );
  }
);
