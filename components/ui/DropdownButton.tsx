'use client';
import {
  FC,
  PropsWithChildren,
  ReactElement,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import { IoIosArrowDown } from 'react-icons/io';

import { Button, ButtonProps } from './Button';
import { customScrollbar } from 'constants/classNames';
import { useHover, useMediaQuery, useOnClickOutside } from 'hooks';
import { CardStack, CardStackProps } from './CardStack';
import { Dialog } from './Dialog';

type DropdownButtonProps = {
  buttonProps?: ButtonProps;
  title?: string | ReactElement;
  className?: string;
  menuTitle?: string;
  noStyle?: boolean;
  keepOpened?: boolean;
  customButton?: ReactElement;
  cardStackProps?: CardStackProps;
};

function getPopoverCoords(triggerRect: DOMRect, popoverRect: DOMRect) {
  const buffer = 10; // Distance from screen edges

  const spaceBelow = window.innerHeight - triggerRect.bottom; // Space between the button and bottom of the window
  const spaceAbove = triggerRect.top; // Space between the button and the top of the window

  // Helper to ensure the dropdown stays within screen bounds horizontally
  const getHorizontalPosition = (left: number) => {
    if (left < buffer) {
      // Prevent going off the left side
      left = buffer;
    }

    if (left + popoverRect.width > window.innerWidth - buffer) {
      // Prevent going off the right side
      left = window.innerWidth - popoverRect.width - buffer;
    }

    return left;
  };

  // Helper to calculate vertical position with top/bottom failover
  const getVerticalPosition = (topDefault: number, topFailover: number) => {
    return spaceBelow < popoverRect.height && spaceAbove > popoverRect.height
      ? topFailover
      : topDefault;
  };

  const top = getVerticalPosition(
    triggerRect.bottom + buffer,
    triggerRect.top - popoverRect.height - buffer
  );
  let left = getHorizontalPosition(
    triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
  );

  left = triggerRect.right;
  if (left + popoverRect.width >= window.innerWidth - buffer) {
    left = window.innerWidth - popoverRect.width - buffer;
  }

  return { top, left };
}

export const DropdownButton: FC<PropsWithChildren<DropdownButtonProps>> = memo(
  ({
    title,
    children,
    buttonProps,
    menuTitle,
    noStyle,
    keepOpened,
    className,
    customButton,
    cardStackProps,
  }) => {
    if (typeof window === 'undefined') return null;
    const isMobile = useMediaQuery('(max-width: 768px)');

    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);

    const [keepOpenedLocal, setKeepOpenedLocal] = useState(false);

    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);

    const [hoverRef, buttonRef, isHovering] = useHover();
    const [hoverContentRef, contentRef, isHoveringContent] = useHover();
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const clickOutsideRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = (type?: 'open' | 'close') => {
      if (!buttonRef.current || !contentRef.current) return;

      if (keepOpened) {
        setOpen(true);
        setKeepOpenedLocal(true);
      }

      if (keepOpenedLocal) {
        setOpen(true);
      } else {
        if (type) {
          setOpen(type === 'open');
        } else {
          setOpen(prev => !prev);
        }
      }

      const { left, top } = getPopoverCoords(
        buttonRef!.current!.getBoundingClientRect(),
        contentRef!.current!.getBoundingClientRect()
      );

      setDropdownLeft(left);
      setDropdownTop(top);
    };

    useEffect(() => {
      if (isMobile) return;
      let timeout: NodeJS.Timeout | undefined;

      if (isHovering) {
        clearTimeout(timeout);
        toggleDropdown('open');
      } else if (isHoveringContent) {
        clearTimeout(timeout);
      } else if (!keepOpenedLocal) {
        timeout = setTimeout(() => {
          toggleDropdown('close');
        }, 500);
      }

      return () => {
        clearTimeout(timeout);
      };
    }, [isHovering, isHoveringContent, keepOpenedLocal, isMobile]);

    const Content = useCallback(() => {
      return (
        <CardStack
          title={menuTitle}
          className={cn(
            'w-full',
            {
              'max-w-[200px] !z-50': !isMobile,
              '!border-none !shadow-none !border-0': isMobile,
            },
            cardStackProps?.className
          )}
          {...cardStackProps}
          items={[
            {
              contentClassName: cn('!p-1 overflow-y-auto max-h-[300px]', customScrollbar),
              children,
            },
            ...(cardStackProps?.items || []),
          ]}
        />
      );
    }, [isMobile, menuTitle, cardStackProps, customScrollbar, children, cardStackProps?.items]);

    const onClick = useCallback(() => {
      !isMobile ? toggleDropdown() : setVisible(true);
    }, [isMobile]);

    const onClickOutside = useCallback(() => {
      setOpen(false);
      setKeepOpenedLocal(false);
      cardStackProps?.setActiveIdx?.(0);
    }, []);

    useOnClickOutside(clickOutsideRef as RefObject<HTMLElement>, onClickOutside);

    return (
      <>
        <Dialog
          px={false}
          py={false}
          visible={visible}
          dismiss={() => setVisible(false)}
          modalType="bottom-sheet"
        >
          <Content />
        </Dialog>
        <div className={cn('relative w-max', className)} ref={isMobile ? null : dropdownRef}>
          <div ref={isMobile ? null : hoverRef}>
            <div onClick={onClick}>{customButton}</div>
            {!customButton && (
              <>
                {noStyle && (
                  <button onClick={onClick} {...buttonProps}>
                    {title}
                  </button>
                )}
                {!noStyle && (
                  <Button onClick={onClick} {...buttonProps}>
                    {title} <IoIosArrowDown />
                  </Button>
                )}
              </>
            )}
          </div>
          <div ref={clickOutsideRef}>
            <nav
              ref={isMobile ? null : hoverContentRef}
              style={{
                ...(open
                  ? {
                      position: 'fixed',
                      left: `${dropdownLeft}px`,
                      top: `${dropdownTop}px`,
                      margin: 0,
                    }
                  : {
                      position: 'fixed',
                    }),
              }}
              className={cn('', {
                '!z-[-9999] opacity-0 !left-[-9999px]': !open,
              })}
            >
              <Content />
            </nav>
          </div>
        </div>
      </>
    );
  }
);
