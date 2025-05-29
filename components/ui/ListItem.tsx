import Link from 'next/link';
import cn from 'classnames';
import { ComponentProps, FC, memo, ReactElement } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Skeleton } from './Skeleton';

export type ListItemProps = {
  withDivider?: boolean;
  icon?: any;
  withArrow?: boolean;
  withBg?: boolean | 'mobile' | 'desktop';
  fullWidth?: boolean;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  value?: string | ReactElement;
  className?: string;
  wrpClassName?: string;
  onClick?: () => void;
} & ComponentProps<'div'>;

export const ListItem: FC<ListItemProps> = memo(
  ({
    withDivider,
    withArrow,
    icon,
    href,
    onClick,
    disabled,
    value,
    className,
    wrpClassName,
    selected,
    fullWidth,
    withBg,
    loading,
    ...props
  }) => {
    const classes = cn(
      '!z-0 relative px-4 py-[10px] rounded-[8px] hocus:opacity-80 hocus:bg-primaryBg cursor-pointer flex flex-row items-center w-full gap-2 text-defaultText',
      {
        'opacity-80 pointer-events-none': disabled,
        'bg-primaryBg': selected,
        '!w-full': fullWidth,
      },
      {
        'bg-neutralBg': typeof withBg === 'boolean' && withBg === true,
        'bg-neutralBg lg:bg-none lg:bg-transparent hocus:!bg-primaryBg': withBg === 'mobile',
        'lg:bg-neutralBg hocus:!bg-primaryBg': withBg === 'desktop',
      },
      className
    );
    const content = () => (
      <>
        {icon} {value}{' '}
        {withArrow && <MdKeyboardArrowRight size={16} className="ml-auto shrink-0 text-primary" />}
      </>
    );

    if (loading) return <Skeleton className="px-4 py-[10px] w-full" />;

    return (
      <div
        className={cn(
          '!z-0 text-[0.875rem] flex flex-col relative',
          {
            '!w-full': fullWidth,
          },
          wrpClassName
        )}
        {...props}
      >
        {href && (
          <Link
            className={classes}
            onClick={() => {
              if (disabled) return;
            }}
            href={disabled ? '' : href}
          >
            {content()}
          </Link>
        )}
        {!href && (
          <button disabled={disabled} onClick={onClick} className={classes}>
            {content()}
          </button>
        )}
        {withDivider && <hr className="relative border border-solid h-[1px] z-0 border-primary" />}
      </div>
    );
  }
);
