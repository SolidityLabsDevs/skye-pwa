import Link from 'next/link';
import { memo, FC, PropsWithChildren, ButtonHTMLAttributes, ReactElement } from 'react';
import cn from 'classnames';

import { Spinner } from './Spinner';

/*
 * add your themes or use any UI component`s library button
 */

export type ButtonProps = {
  onClick?: (args?: any) => void;
  theme?:
    | 'accent'
    | 'accent-2'
    | 'accent-3'
    | 'outline'
    | 'primary-outline'
    | 'red'
    | 'black'
    | 'white'
    | 'gold'
    | 'glass'
    | 'primary'
    | 'gradient';
  className?: string;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  big?: boolean;
  shine?: boolean;
  bold?: boolean;
  pill?: boolean;
  compact?: boolean;
  fullWidth?: boolean;
  icon?: ReactElement;
} & Partial<ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>>;

const Tag: FC<PropsWithChildren<ButtonProps>> = ({ href, children, ...props }) => {
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

const spinnerColor: Record<string, string> = {
  black: 'white',
};

export const Button: FC<PropsWithChildren<ButtonProps>> = memo(
  ({
    onClick,
    big,
    bold,
    theme = 'black',
    disabled,
    className,
    children,
    loading,
    href,
    shine,
    pill,
    fullWidth,
    icon,
    compact,
    ...props
  }) => {
    return (
      <Tag
        href={href}
        disabled={disabled || loading}
        className={cn(
          'relative !shrink-0 min-w-14 w-max inline-flex px-3 rounded-[8px] border-solid border-[1px] border-default py-2 text-[0.875rem] font-medium hocus:opacity-80 flex-row items-center justify-center gap-2',
          {
            // themed
            'text-primary bg-primaryBg ': theme === 'accent',
            'text-onPrimaryBg bg-primaryBg ': theme === 'accent-2',
            'text-primary bg-primaryForeground ': theme === 'accent-3',

            'border-default text-defaultText bg-transparent': theme === 'outline',
            'bg-transparent !text-primary !border-primary !h-auto w-max':
              theme === 'primary-outline',
            'bg-primary !text-white !border-primary !h-auto w-max': theme === 'primary',

            // colors
            'text-red-500 bg-onNeutralBg border-red-500 ': theme === 'red',
            'text-[#FFF] bg-black ': theme === 'black',
            'text-black bg-[#fff] ': theme === 'white',

            // gradients
            'bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 !border-0':
              theme === 'gold',
            'text-defaultText bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10':
              theme === 'glass',

            // sizes and other
            '!text-base !py-[10px] px-[18px]': big,
            '!font-extrabold': bold,
            '!w-full': fullWidth,
            'opacity-80 cursor-not-allowed': disabled,
            shine: shine,
            '!rounded-[1.5rem]': pill,

            // local
            '[filter:drop-shadow(0px_8px_8px_rgba(165,72,247,0.2))_drop-shadow(0px_8px_30px_rgba(81,152,239,0.16))]':
              theme === 'gradient',
            '[background:linear-gradient(to_right,_#47326B_0%,_#914372_50%,_#AC714F_100%)]':
              theme === 'gradient',
            '!p-4 !rounded-[30px]  flex flex-row items-center gap-2 font-light justify-center text-center':
              theme === 'gradient',
          },
          className
        )}
        onClick={onClick}
        {...props}
      >
        {loading && <Spinner color={spinnerColor[theme]} />}
        {!loading && !compact && (
          <>
            {icon} {children}
          </>
        )}
        {!loading && compact && icon}
      </Tag>
    );
  }
);
