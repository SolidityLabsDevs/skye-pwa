'use client';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import {
  FC,
  memo,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
  ReactNode,
  JSX,
} from 'react';
import { IconType } from 'react-icons';

import { customScrollbar } from 'constants/classNames';
import { DropdownButton } from 'components/ui/DropdownButton';

export type MobileTabbarProps = {
  variant?: 'floating' | 'fixed';
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
  return href ? href === pathname : false;
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
  variant = 'fixed',
}) => {
  const tagClasses = (active?: boolean) => {
    return {
      fixed: cn(
        'flex items-center justify-center p-2 hover:bg-primary !text-defaultText hover:!text-white',
        {
          '!bg-primary !text-white': active,
        }
      ),
      floating: cn(
        'gap-2 bg-none rounded-[4px] text-[0.75rem] border-2 border-solid border-neutralBg text-defaultText flex items-center justify-center ',
        'hover:text-primary',
        {
          'py-1 px-2 !bg-onNeutralBg !text-defaultText font-bold border-2 border-solid !border-primary':
            active,
        }
      ),
    };
  };

  const contentWrapperClasses = () => {
    return {
      fixed:
        'absolute bottom-0 left-0 flex bg-neutralBg justify-between flex-row w-full gap-3 pt-2 pb-3 px-3 border-t bg-onNeutralBg border-default',
      floating:
        'py-3.5 border-2 w-full border-solid border-primary px-[1.125rem] flex bg-neutralBg justify-between flex-row gap-4 rounded-[12px]',
    };
  };

  const wrapperClasses = () => {
    return {
      fixed: ' w-[90%] flex justify-around',
      floating:
        'absolute bottom-0 w-[90%] max-w-[400px] flex justify-around pt-3 pb-5 transition-all xl:pb-1',
    };
  };

  const wrapperStyles = () => {
    return {
      fixed: {},
      floating: {
        opacity: position ? `-${position}%` : '100%',
        bottom: `${position}px`,
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
        <div className={cn('flex flex-row gap-4 overflow-x-auto flex-1', customScrollbar)}>
          {finalRoutes.map((route, idx) => {
            const href =
              route?.href?.split?.('?')?.[0] ||
              route?.nestedLinks?.find(l => l?.href === pathname)?.href;
            const active = isActive(href, pathname);
            const key = (route?.href || '') + idx;
            let content = (
              <>
                {route.icon as ReactNode} {active && route.label}
              </>
            );

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
      <div className={contentWrapperClasses()[variant]}>
        <Content />
      </div>
    </div>
  );
};

export const MobileTabbar: FC<MobileTabbarProps> = memo(({ routes, variant, lastLinkFixed }) => {
  const pathname = usePathname();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const element = document.body;
    const onScroll = () => setPosition((element?.scrollTop || 0) * 100);
    element?.addEventListener('scroll', onScroll, { passive: true });
    return () => element?.removeEventListener('scroll', onScroll);
  }, []);

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
