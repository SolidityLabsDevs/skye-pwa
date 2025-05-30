'use client';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { FC, memo, PropsWithChildren, ReactElement, useState, ReactNode, JSX } from 'react';
import { IconType } from 'react-icons';

import { customScrollbar } from 'constants/classNames';
import { DropdownButton } from 'components/ui/DropdownButton';
import { NoiseBg } from 'components/backgrounds/NoiseBg';

export type MobileTabbarProps = {
  variant?: 'floating' | 'fixed' | 'local';
  routes: {
    href?: string;
    nestedLinks?: MobileTabbarProps['routes'];
    onClick?: () => void;
    label?: string;
    icon?: string | ReactElement | IconType | JSX.Element;
  }[];
  position?: number;
  lastLinkFixed?: boolean;
  isActive?: (href?: string) => boolean;
  pathname?: string;
};

const isActive = (href?: string, pathname?: string) => {
  return href ? href.split('?')[0] === pathname : false;
};

const Tag: FC<
  PropsWithChildren<Omit<MobileTabbarProps['routes'][number], 'icon'> & { className?: string }>
> = ({ href, children, ...props }) => {
  if (href) {
    return (
      <Link href={href} {...props} prefetch={false}>
        {children}
      </Link>
    );
  } else {
    return <button {...props}>{children}</button>;
  }
};

const Tabbar: FC<MobileTabbarProps> = ({
  routes,
  position,
  pathname,
  lastLinkFixed,
  variant = 'floating',
}) => {
  const tagClasses = (active?: boolean) => {
    return {
      local: cn('text-default', {
        'text-primary': active,
      }),
      fixed: cn(
        'flex items-center justify-center p-2 hover:bg-primary !text-[#b3b3b3] hover:!text-black',
        {
          '!text-black': active,
        }
      ),
      floating: cn(
        'gap-2 bg-none  text-[0.813rem]   text-[#b3b3b3] flex items-center justify-center ',
        'hover:text-primary',
        {
          'py-1 px-2 !bg-onNeutralBg !text-defaultText font-bold ': active,
        }
      ),
    };
  };

  const contentWrapperClasses = () => {
    return {
      local: 'w-full flex bg-onNeutralBg py-[18px] justify-around gap-4',
      fixed:
        'absolute bottom-0 left-0 flex bg-white max-w-[540px] mx-auto -translate-x-1/2 left-1/2 justify-between flex-row w-full gap-3 pt-2 pb-3 px-3 rounded-[24px] shadow-sm',
      floating:
        'py-3    w-full   px-8 flex bg-[#242328] rounded-[50px] border border-default justify-between flex-row gap-4',
    };
  };

  const wrapperClasses = () => {
    return {
      local: 'absolute bottom-0 w-full max-w-[540px] flex justify-around',
      fixed: ' w-[90%] flex justify-around',
      floating:
        'absolute  bottom-0 w-[90%] max-w-[400px] flex justify-around pt-3 pb-5 transition-all xl:pb-1',
    };
  };

  const wrapperStyles = () => {
    return {
      fixed: {},
      floating: {
        opacity: position ? `-${position}%` : '100%',
        bottom: `30px`,
        // bottom: `${position}px`,
        left: '50%',
        transform: 'translate(-50%, 0)',
      },
      local: {
        left: '50%',
        transform: 'translate(-50%, 0)',
      },
    };
  };

  const finalRoutes = lastLinkFixed ? [...routes].slice(0, routes.length - 1) : routes;
  const lastRoute = routes[routes.length - 1];

  const Content = () => {
    return (
      <>
        <div
          className={cn(
            'flex relative flex-row gap-4 overflow-x-auto flex-1 justify-around',
            customScrollbar
          )}
        >
          {finalRoutes.map((route, idx) => {
            const href =
              route?.href?.split?.('?')?.[0] ||
              route?.nestedLinks?.find(l => l?.href === pathname)?.href;
            const active = isActive(href, pathname);
            const key = (route?.href || '') + idx;
            let content = (
              <div className="flex flex-col items-center gap-1">
                {route.icon as ReactNode}
                {route.label}
              </div>
            );

            if (variant === 'local') {
              content = <div className="relative">{route.icon as ReactNode}</div>;
            }

            if (variant === 'fixed') {
              content = (
                <div className="relative flex flex-col items-center text-center">
                  {route.icon as ReactNode}
                  <span className="block text-[0.5rem] leading-none">{route.label}</span>
                </div>
              );
            }

            if (route.nestedLinks) {
              return (
                <DropdownButton
                  key={key}
                  customButton={
                    <button key={key} className={tagClasses(active)[variant]}>
                      {content}
                    </button>
                  }
                >
                  {route?.nestedLinks?.map((l, i) => (
                    <Tag
                      href={l.href}
                      key={`${route.label}-${l.href}-${i}`}
                      onClick={l.onClick}
                      className={tagClasses(isActive(l.href, pathname))[variant] + ' animate-slide'}
                    >
                      {l.label}
                    </Tag>
                  ))}
                </DropdownButton>
              );
            }

            return (
              <Tag
                href={route.href}
                key={key}
                onClick={route.onClick}
                className={tagClasses(active)[variant]}
              >
                {content}
              </Tag>
            );
          })}
        </div>
        {lastRoute && lastLinkFixed && (
          <Tag
            className={tagClasses(false)[variant]}
            key={lastRoute.href || lastRoute?.label}
            href={lastRoute.href}
            onClick={lastRoute.onClick}
          >
            <>{lastRoute?.icon as ReactNode}</>
          </Tag>
        )}
      </>
    );
  };

  return (
    <div style={wrapperStyles()[variant]} className={wrapperClasses()[variant]}>
      <div className={cn(contentWrapperClasses()[variant], 'overflow-hidden relative')}>
        <Content />
        <NoiseBg className="h-[78px] rounded-[50px] mt-3" />
      </div>
    </div>
  );
};

export const MobileTabbar2: FC<MobileTabbarProps> = memo(({ routes, variant, lastLinkFixed }) => {
  const pathname = usePathname();
  const [position] = useState(0);

  return (
    <Tabbar
      variant={variant}
      routes={routes}
      pathname={pathname}
      position={position}
      lastLinkFixed={lastLinkFixed}
    />
  );
});
