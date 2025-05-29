'use client';
import { FC, PropsWithChildren, memo, useState } from 'react';
import cn from 'classnames';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type AccordionProps = {
  title: string;
  className?: string;
  contentClassName?: string;
  initialOpen?: boolean;
};

export const Accordion: FC<PropsWithChildren<AccordionProps>> = memo(
  ({ title, className, contentClassName, children, initialOpen }) => {
    const [open, setOpen] = useState(!!initialOpen);

    return (
      <div
        className={cn(
          'rounded-[8px] border-[1px] border-solid border-default h-max w-full !bg-onNeutralBg',
          className
        )}
      >
        <button onClick={() => setOpen(prev => !prev)} className="w-full">
          <div className="flex flex-row items-center justify-between gap-5 p-4 text-defaultText">
            {title}
            {!open && <IoIosArrowDown className="shrink-0" />}
            {open && <IoIosArrowUp className="shrink-0" />}
          </div>
          {open && <hr className="h-px border-0 bg-default" />}
        </button>
        <div
          className={cn(
            'transition-all h-0 p-0 text-defaultText',
            {
              '!h-full !p-4': open,
            },
            contentClassName
          )}
        >
          {open && children}
        </div>
      </div>
    );
  }
);
