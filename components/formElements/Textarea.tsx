'use client';
import { memo, useId, FC, ComponentPropsWithRef } from 'react';
import cn from 'classnames';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';

import { BiErrorCircle } from 'react-icons/bi';
import { RequiredStar } from 'components/ui/RequiredStar';

type TextareaProps = {
  // Appearance and Style
  className?: string;
  wrpClassName?: string;

  // Content and Labels
  placeholder?: string;
  icon?: React.ReactElement;
  iconAction?: () => void;

  // Error Handling
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  errorIcon?: string;

  // Validation and Requirements
  required?: boolean;

  // Additional Features
  placeholderWithAnimation?: boolean;
};

export const Textarea: FC<TextareaProps & ComponentPropsWithRef<'textarea'>> = memo(
  ({
    icon,
    errorIcon = <BiErrorCircle color="red" />,
    className,
    wrpClassName,
    error,
    required,
    iconAction,
    placeholderWithAnimation = true,
    placeholder,
    cols = 5,
    rows = 5,
    ref,
    ...props
  }) => {
    const id = useId();
    const wrpId = useId();

    return (
      <div
        id={wrpId}
        className={cn(
          'bg-onNeutralBg box-border border-[1px] border-solid border-default group shrink-0 max-w-[350px] min-h-12 relative w-full transition-all px-6 py-[10px] rounded-[8px]',
          wrpClassName
        )}
      >
        <textarea
          className={cn('peer mt-[6px] w-full text-defaultText bg-onNeutralBg', className, {
            '!text-red-500 border-red-500': !!error,
          })}
          {...props}
          rows={rows}
          cols={cols}
          id={id}
          ref={ref}
          placeholder={placeholderWithAnimation ? ' ' : placeholder}
        />
        {placeholderWithAnimation && placeholder && (
          <label
            htmlFor={id}
            className={cn(
              'absolute text-sm text-gray-500 !left-6 duration-300 transform -translate-y-4 scale-75 top-[14px] z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto',
              { '!text-red-500 border-red-500': !!error }
            )}
          >
            {placeholder}
            <RequiredStar visible={required} />
          </label>
        )}
        {icon && !error && (
          <span
            onClick={iconAction}
            className={cn('absolute right-2.5  ext-defaultText text-[20px] z-20 !top-[14px]', {
              'hover:cursor-pointer hover:opacity-80': !!iconAction,
            })}
          >
            {icon}
          </span>
        )}
        {errorIcon && !!error && (
          <span
            data-tooltip-id={id}
            data-tooltip-content={String(error)}
            className={cn('absolute right-2.5 text-[#041C2C] text-[20px] z-20 !top-[14px]', {
              '!text-red-500': !!error,
            })}
          >
            {errorIcon}
          </span>
        )}
        <Tooltip id={id} />
      </div>
    );
  }
);
