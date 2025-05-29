'use client';
import cn from 'classnames';
import {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
  PropsWithChildren,
  useState,
  ReactNode,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createPortal } from 'react-dom';

import { customScrollbar } from 'constants/classNames';

import { IoClose } from 'react-icons/io5';
import { GoDash } from 'react-icons/go';

import { useScrollBlock } from 'hooks';

type Props = {
  dismiss?: string | (() => void);
  goBack?: boolean;
  px?: boolean;
  py?: boolean;
  withClose?: boolean;
  rounded?: boolean;
  visible?: boolean;
  transparent?: boolean;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  withBorder?: boolean;
  closeOutside?: boolean;
  title?: string;
  size?: number;
  icon?: ReactNode;
  modalType?: 'modal' | 'bottom-sheet';
};

export function Dialog({
  children,
  visible,
  dismiss = () => null,
  px = true,
  py = true,
  withClose = true,
  rounded = true,
  closeOutside = true,
  className,
  contentClassName,
  titleClassName,
  withBorder = true,
  title,
  size = 540,
  transparent,
  goBack,
  icon,
  modalType = 'modal',
}: PropsWithChildren<Props>) {
  const [blockScroll, allowScroll] = useScrollBlock();
  const searchParams = useSearchParams();
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const [visibleLocal, setVisibleLocal] = useState(false);
  const close = () => setVisibleLocal(false);

  const onDismiss = useCallback(() => {
    if (dismiss) {
      if (typeof dismiss === 'string') {
        router.push(dismiss);
      } else {
        dismiss?.();
      }
    } else {
      searchParams?.size && router.back();
    }

    if (goBack) {
      router.back();
    }

    close();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    e => {
      if ((e.target === overlay.current || e.target === wrapper.current) && withClose) {
        onDismiss?.();
      }
    },
    [onDismiss, overlay, wrapper, withClose]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && withClose) onDismiss?.();
    },
    [onDismiss, withClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  useEffect(() => setVisibleLocal(!!visible), [visible]);

  useEffect(() => {
    visibleLocal && blockScroll;
    !visibleLocal && allowScroll;
  }, [visibleLocal]);

  if (!visibleLocal) return null;

  const isBottomSheet = modalType === 'bottom-sheet';
  const maxWidth = Math.min(isBottomSheet ? window.innerWidth : window.innerWidth - 16, size);
  const maxHeight = Math[size > window.innerHeight - 44 ? 'min' : 'max'](
    window.innerHeight - 44,
    size
  );

  const CloseButton = () => {
    if (!withClose) return null;

    if (modalType === 'bottom-sheet' && !closeOutside) {
      return (
        <button
          onClick={onDismiss}
          className={cn('absolute left-[44%] text-defaultText mx-auto', {})}
        >
          <GoDash size={40} />
        </button>
      );
    }

    return (
      <button
        onClick={onDismiss}
        className={cn('', {
          'absolute right-0 -top-6 lg:right-[-24px] text-defaultText': closeOutside,
          'ml-auto text-defaultText': !closeOutside,
          hidden: !withClose,
        })}
      >
        <IoClose size={20} />
      </button>
    );
  };

  return (
    <>
      {createPortal(
        <div
          ref={overlay}
          className={cn('fixed top-0 bottom-0 left-0 right-0 z-40 mx-auto bg-black/60', {
            'animate-slideBottom': isBottomSheet,
            'animate-popup': !isBottomSheet,
          })}
          onClick={e => {
            if (e.target === overlay.current) {
              onClick?.(e);
            }
          }}
        >
          <div
            ref={wrapper}
            className={cn(
              'max-h-full w-full bg-onNeutralBg',
              {
                'absolute !z-50 bottom-0 sm:w-10/12 md:w-8/12 lg:w-1/2 max-h-full -translate-x-1/2 left-1/2':
                  isBottomSheet,
                'absolute !z-50 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 max-h-full -translate-x-1/2 left-1/2':
                  !isBottomSheet,
                'border-[1px] border-solid border-default': withBorder,
                'shadow-[0px_8px_24px_0px_rgba(21,21,22, 0.04)]': !withBorder,
                'px-4': px,
                'py-4': py,
                'rounded-[12px]': rounded && !isBottomSheet,
                'rounded-t-[16px]': rounded && isBottomSheet,
                'bg-transparent w-max border-0 border-none': transparent,
              },
              isBottomSheet
                ? 'translate-y-0'
                : '-translate-y-0 bottom-4 md:-translate-y-1/2 md:bottom-auto md:top-1/2',
              className
            )}
            style={{
              width: '100%',
              maxWidth,
              maxHeight,
              ...(transparent
                ? {
                    margin: 0,
                    padding: 0,
                  }
                : {}),
            }}
          >
            {closeOutside && <CloseButton />}
            <div
              className={cn(
                'mb-4 text-defaultText flex flex-row gap-2 items-center',
                {
                  hidden: !title && !icon && closeOutside,
                },
                titleClassName
              )}
            >
              {icon} {title} {!closeOutside && <CloseButton />}
            </div>
            <div
              className={cn(
                'overflow-y-auto h-full text-defaultText',
                customScrollbar,
                contentClassName
              )}
              style={{ maxHeight: maxHeight * 0.9 }}
            >
              {children}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
