'use client';
import {
  ComponentProps,
  Dispatch,
  FC,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  memo,
  useMemo,
} from 'react';
import cn from 'classnames';

import { customScrollbar } from 'constants/classNames';

import { MdKeyboardArrowLeft } from 'react-icons/md';

export type CardStackProps = {
  withBorder?: boolean;
  disabled?: boolean;
  activeIdx?: number;
  setActiveIdx?: Dispatch<SetStateAction<number>>;
  items: {
    title?: ReactNode;
    className?: string;
    contentClassName?: string;
    children?: ReactNode;
  }[];
} & ComponentProps<'div'>;

export const CardStack: FC<PropsWithChildren<CardStackProps>> = memo(
  ({ className, items, activeIdx = 0, setActiveIdx, disabled, withBorder = true, ...props }) => {
    const goBack = () => {
      setActiveIdx?.(0);
    };

    const activeItem = useMemo(() => {
      return items?.[activeIdx];
    }, [items, activeIdx]);

    const { title, children, contentClassName } = activeItem;

    const BackBtn = () => {
      return (
        <>
          {activeIdx > 0 && (
            <button
              type="button"
              disabled={disabled}
              onClick={goBack}
              className={cn({ 'mt-1': !title })}
            >
              <MdKeyboardArrowLeft size={24} className={cn('text-defaultText')} />
            </button>
          )}
        </>
      );
    };

    return (
      <div
        className={cn(
          'relative rounded-[8px] h-max w-full bg-onNeutralBg',
          {
            'border-[1px] border-solid border-default': withBorder,
            'shadow-[0px_8px_24px_0px_rgba(21,21,22, 0.04)]': !withBorder,
          },
          className
        )}
        {...props}
      >
        {title && (
          <>
            <div className="flex flex-row items-center gap-2 p-4 text-defaultText">
              <BackBtn />
              {title}
            </div>
            {withBorder && children && <hr className="h-px border-0 bg-default" />}
          </>
        )}
        {children && (
          <div
            className={cn('w-full', {
              'flex flex-row items-start': !title,
            })}
          >
            {!title && <BackBtn />}
            <div
              key={activeIdx}
              className={cn(
                'animate-slide w-full overflow-auto',
                {
                  'p-4': title,
                  'p-1': !title,
                },
                customScrollbar,
                contentClassName
              )}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }
);
