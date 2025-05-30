'use client';
import { FC, PropsWithChildren, memo } from 'react';
import cn from 'classnames';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useHover } from 'hooks';

type HorizontalSectionProps = {
  wrpClassName?: string;
  className?: string;
  scrollBy?: number;
};

export const HorizontalSection: FC<PropsWithChildren<HorizontalSectionProps>> = memo(
  ({ children, className, scrollBy = 200, wrpClassName }) => {
    const [hoverRef, nodeRef, isHovering] = useHover();

    return (
      <div className={cn('relative w-full', wrpClassName)}>
        <button
          className={cn(
            'absolute left-0 z-50 p-3 -translate-y-1/2 bg-neutralBg rounded-full opacity-50 top-1/2',
            {
              '!opacity-100': isHovering,
              hidden: !nodeRef.current || nodeRef.current?.scrollLeft === 0,
            }
          )}
          onClick={() => {
            if (!nodeRef.current) return;
            nodeRef.current.scrollBy(-scrollBy, 0);
          }}
        >
          <FaChevronLeft className="text-defaultText" />
        </button>
        <div
          ref={hoverRef}
          className={cn(
            '!no-scrollbar scroll-smooth snap-mandatory snap-x py-1 px-6 flex flex-row gap-4 items-center w-full overflow-y-hidden overflow-x-auto relative',
            className
          )}
        >
          {children}
        </div>
        <button
          className={cn(
            'absolute right-0 z-50 p-3 -translate-y-1/2 bg-neutralBg rounded-full opacity-50 top-1/2',
            {
              '!opacity-100': isHovering,
              hidden: nodeRef.current
                ? nodeRef.current?.offsetWidth >= nodeRef.current?.scrollWidth
                : true,
            }
          )}
          onClick={() => {
            if (!nodeRef.current) return;
            nodeRef.current.scrollBy(scrollBy, 0);
          }}
        >
          <FaChevronRight className="text-defaultText" />
        </button>
      </div>
    );
  }
);
