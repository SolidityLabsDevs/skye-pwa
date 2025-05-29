'use client';
import { FC, memo, useEffect, useState } from 'react';
import cn from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { IconType } from 'react-icons';

import { ICONS } from './DashboardLayout';
import { DropdownButton } from 'components/ui/DropdownButton';
import { getIcon } from 'helpers';

export type TDashboardLink = {
  label: string;
  href?: string;
  icon?: keyof typeof ICONS | IconType;
  disabled?: boolean;
  onClick?: () => void;
  nestedLinks?: TDashboardLink[];
};

type DashboardLinkProps = {
  link: TDashboardLink;
  className?: string;
  compact?: boolean;
  onClick?: () => void;
};

export const DashboardLink: FC<DashboardLinkProps> = memo(
  ({ link, className, onClick, compact }) => {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const classes = (link: TDashboardLink, isNested?: boolean) =>
      cn(
        'w-full items-center max-w-[95%] px-4 text-[0.875rem] text-defaultText rounded-[8px] flex flex-row justify-start gap-[12px] py-[10px] bg-none ',
        {
          'bg-primaryForeground text-primary': pathname === link.href,
          'ml-4': isNested && !compact,
          'flex-col max-w-full': compact,
          'opacity-50 pointer-events-none hocus:cursor-not-allowed': link?.disabled,
        },
        'hocus:opacity-80 hocus:bg-primaryBg',
        className
      );

    const content = (_link: TDashboardLink, withLabel = true) => {
      const _icon = getIcon(_link.icon);

      const icon = (
        <span
          className={cn('', {
            hidden: _icon === undefined,
          })}
        >
          {_icon?.({
            className: cn('text-defaultText hocus:text-primary', {
              '!text-primary': pathname === _link.href,
            }),
            size: 24,
          })}
        </span>
      );

      const icon2 = (
        <span
          className={cn('', {
            hidden: !_link.nestedLinks,
          })}
        >
          {getIcon(open ? 'IoIosArrowDown' : 'IoIosArrowForward')?.({
            className: cn('text-defaultText'),
            size: 24,
          })}
        </span>
      );

      return (
        <>
          {icon}
          <span
            className={cn('', {
              hidden: !withLabel, // TODO I decided to hide text in compact sand if you want to show it you can do your codes here
            })}
          >
            {_link.label}
          </span>
          {!compact && icon2}
        </>
      );
    };

    useEffect(() => {
      link?.href && router.prefetch(link.href);
      if (link.nestedLinks) {
        link.nestedLinks.forEach(l => l.href && router.prefetch(l.href));
        link.nestedLinks?.some(nestedLink => pathname === nestedLink.href) && setOpen(true);
      }
    }, [link, pathname]);

    const nestedLinks = (
      <>
        {link?.nestedLinks?.map((nestedLink, idx) => (
          <Link
            key={idx}
            className={classes(nestedLink, true)}
            href={nestedLink.href || '#'}
            onClick={nestedLink.onClick}
          >
            {content(nestedLink)}
          </Link>
        ))}
      </>
    );

    if (link.nestedLinks && !compact) {
      return (
        <>
          <button
            onClick={() => {
              onClick?.();
              const firstHref = link.nestedLinks?.[0]?.href;
              firstHref &&
                link.nestedLinks?.every(nestedLink => pathname !== nestedLink.href) &&
                !open &&
                router.push(firstHref);
              setOpen(prev => !prev);
            }}
            className={classes(link)}
          >
            {content(link)}
          </button>
          {open && nestedLinks}
        </>
      );
    }

    if (link.nestedLinks && compact) {
      return (
        <DropdownButton
          noStyle
          title={content(link, false)}
          buttonProps={{ className: classes(link), title: link.label }}
          className="m-auto"
        >
          {nestedLinks}
        </DropdownButton>
      );
    }

    return (
      <Link className={classes(link)} href={link.href || '#'} onClick={onClick} title={link.label}>
        {content(link, !compact)}
      </Link>
    );
  }
);
