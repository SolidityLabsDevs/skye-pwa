'use client';
import cn from 'classnames';
import {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
  PropsWithChildren,
  useState,
  memo,
  FC,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createPortal } from 'react-dom';

import { customScrollbar } from 'constants/classNames';

import { IoClose } from 'react-icons/io5';
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
  title?: string;
  size?: number;
};

export const Drawer: FC<PropsWithChildren<Props>> = memo(
  ({
    children,
    visible,
    dismiss = () => null,
    px = true,
    py = true,
    withClose = true,
    rounded = true,
    className,
    title,
    size = 640,
    transparent,
    goBack,
  }) => {
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
    }, [router, withClose]);

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

    return (
      <>
        {createPortal(
          <div
            ref={overlay}
            className="fixed top-0 bottom-0 left-0 right-0 z-40 mx-auto bg-black/60 animate-slide"
            onClick={e => {
              if (e.target === overlay.current) {
                onClick?.(e);
              }
            }}
          >
            <div
              ref={wrapper}
              className={cn(
                'bg-onNeutralBg absolute !z-50 w-full top-0 sm:w-10/12 md:w-8/12 lg:w-1/2 !h-screen right-0',
                {
                  'px-6': px,
                  'py-6': py,
                  'rounded-[12px]': rounded,
                  'bg-transparent w-max': transparent,
                },
                className
              )}
              style={{
                maxWidth: size,
                ...(transparent
                  ? {
                      margin: 0,
                      padding: 0,
                      width: 'max-content',
                    }
                  : {}),
              }}
            >
              <div
                className={cn(
                  'text-defaultText w-full text-[1.5rem] flex flex-row justify-center',
                  {
                    'px-6': !px,
                    'py-6': !py,
                  }
                )}
                style={{
                  ...(transparent
                    ? {
                        margin: 0,
                        padding: 0,
                        paddingRight: '20px',
                      }
                    : {}),
                }}
              >
                {title && <p className="flex-1 text-center">{title}</p>}
                {withClose && (
                  <button onClick={onDismiss} className="ml-auto text-defaultText">
                    <IoClose size={20} />
                  </button>
                )}
              </div>
              <div
                className={cn(
                  'overflow-y-auto !max-h-[90vh] text-defaultText h-full pb-28 lg:pb-0',
                  customScrollbar
                )}
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
);
