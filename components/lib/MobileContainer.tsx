'use client';
import cn from 'classnames';
import { FC, PropsWithChildren, memo, ReactNode, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { LuMenu } from 'react-icons/lu';

import { customScrollbar } from 'constants/classNames';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { Container } from 'components/ui/Container';
import { ScreenTitle } from 'components/ui/ScreenTitle';
import { useUserStore } from 'stores';
import { MobileTabbar2, MobileTabbarProps } from './MobileTabbar2';

import { IoEyeOutline } from 'react-icons/io5';
import { LuBedDouble } from 'react-icons/lu';
import Image from 'next/image';

type MobileContainerProps = {
  className?: string;
  containerClassName?: string;
  backUrl?: string;
  canGoBack?: boolean;
  showTabbar?: boolean;
  showHeader?: boolean;
  isStackScreen?: boolean;
  headerScreenTitle?: ReactNode;
  screenTitle?: ReactNode;
  headerWithDrawerBtn?: boolean;
  withoutPadding?: boolean;
  bgClassName?: string;
  mobileTabBarProps?: MobileTabbarProps;
};

export const MobileContainer: FC<PropsWithChildren<MobileContainerProps>> = memo(
  ({
    children,
    showTabbar = false,
    showHeader = false,
    mobileTabBarProps,
    className,
    isStackScreen,
    screenTitle,
    headerScreenTitle,
    headerWithDrawerBtn,
    withoutPadding,
    backUrl,
    bgClassName,
    canGoBack = true,
    containerClassName,
  }) => {
    const user = useUserStore(state => state.user);

    const router = useRouter();

    const tabBarRoutes = useMemo(() => {
      return [
        {
          label: '',
          href: `#`,
          icon: <LuBedDouble size={24} />,
        },
        {
          label: '',
          href: `#`,
          icon: <Image alt="" src="/images/assets/2.png" height={54} width={46} />,
        },
        {
          label: '',
          href: `#`,
          icon: <IoEyeOutline size={24} />,
        },
      ];
    }, [user]);

    return (
      <>
        <Container
          px
          className={cn('max-w-[540px] relative h-full', bgClassName, containerClassName)}
        >
          <div
            id="app_header"
            className={cn(
              'bg-neutralBg sticky z-30 text-defaultText  min-h-[64.57px] top-0 left-0 flex flex-col gap-4 w-full py-3',
              {
                hidden: !showHeader,
                'bg-none bg-transparent': !!bgClassName,
              }
            )}
          >
            <div className="flex flex-row items-center w-full gap-5">
              <button
                onClick={() => {
                  if (backUrl) {
                    router.push(backUrl);
                    return;
                  }

                  if (window.history?.length) {
                    router.back();
                  } else {
                    router.push('/');
                  }
                }}
                className={cn({
                  hidden: !isStackScreen || !canGoBack,
                })}
              >
                <MdKeyboardArrowLeft className="text-defaultText" size={24} />
              </button>
              {typeof headerScreenTitle === 'string' && (
                <ScreenTitle className="!mb-0" title={headerScreenTitle} />
              )}
              {typeof headerScreenTitle !== 'string' && <>{headerScreenTitle}</>}
              {headerWithDrawerBtn && (
                <button
                  className={cn('ml-auto', {
                    hidden: isStackScreen,
                  })}
                >
                  <LuMenu size={30} />
                </button>
              )}
            </div>
            {typeof screenTitle === 'string' && (
              <ScreenTitle className="!mb-0" title={screenTitle} />
            )}
            {typeof screenTitle !== 'string' && <>{screenTitle}</>}
          </div>
          <div
            id="app_content"
            className={cn(
              'relative !w-full h-full py-3 !overflow-x-hidden bg-neutralBg overflow-y-auto',
              className,
              {
                '!pb-[100px]': true,
                '!px-0 !pt-0 !pb-[0px]': withoutPadding || !showTabbar,
                'bg-none bg-transparent': !!bgClassName,
              },
              customScrollbar
            )}
          >
            {children}
          </div>
        </Container>
        {showTabbar &&
          !isStackScreen &&
          (tabBarRoutes?.length || mobileTabBarProps?.routes.length) && (
            <MobileTabbar2
              {...mobileTabBarProps}
              routes={mobileTabBarProps?.routes || tabBarRoutes}
            />
          )}
      </>
    );
  }
);
