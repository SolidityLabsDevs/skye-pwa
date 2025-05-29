'use client';
import { InputMask, InputMaskProps } from '@react-input/mask';
import { memo, ComponentProps, useId, useState, FC } from 'react';
import cn from 'classnames';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';

import { BiErrorCircle } from 'react-icons/bi';
import { RequiredStar } from 'components/ui/RequiredStar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';

type InputProps = {
  // Appearance and Style
  className?: string;
  wrpClassName?: string;
  wrpInputClassName?: string;

  // Content and Labels
  placeholder?: string;
  label?: string | React.ReactElement;
  icon?: React.ReactElement;
  iconAction?: () => void;

  // Error Handling
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  errorIcon?: string;

  // Validation and Requirements
  required?: boolean;

  // Additional Features
  placeholderWithAnimation?: boolean;
  fullWidth?: boolean;
} & ComponentProps<'input'> &
  Partial<InputMaskProps>;

export const Input: FC<InputProps> = memo(
  ({
    icon,
    errorIcon = <BiErrorCircle color="red" />,
    className,
    wrpClassName,
    wrpInputClassName,
    error,
    required,
    iconAction,
    placeholderWithAnimation = true,
    placeholder,
    mask = '',
    label,
    fullWidth,
    ref,
    ...props
  }) => {
    const id = useId();
    const wrpId = useId();

    const [inputType, setInputType] = useState(props.type);

    const inputClasses = cn('peer mt-[6px] w-full text-defaultText bg-onNeutralBg', className, {
      '!text-red-500 border-red-500': !!error,
    });

    if (props.type === 'password') {
      iconAction = () => {
        setInputType(prev => (prev === 'password' ? 'text' : 'password'));
      };

      icon = inputType === 'password' ? <FaEye /> : <FaEyeSlash />;
    }

    if (props.type === 'search') {
      icon = <IoIosSearch />;
    }

    return (
      <div className={cn('flex flex-col w-full gap-1', wrpClassName)}>
        {typeof label === 'string' && (
          <label className="text-defaultText opacity-80" htmlFor={id}>
            {label} <RequiredStar visible={required} />
          </label>
        )}
        {typeof label !== 'string' && label}
        <div
          id={wrpId}
          className={cn(
            'bg-onNeutralBg box-border border border-solid border-default group shrink-0 max-w-[350px] min-h-10 relative w-full transition-all px-3 py-1 rounded-[8px]',
            {
              '!w-full !max-w-full': fullWidth,
            },
            wrpInputClassName
          )}
        >
          {mask ? (
            <InputMask
              className={inputClasses}
              mask={mask}
              {...props}
              id={id}
              ref={ref}
              placeholder={placeholderWithAnimation ? ' ' : placeholder}
            />
          ) : (
            <input
              className={inputClasses}
              {...props}
              id={id}
              ref={ref}
              placeholder={placeholderWithAnimation ? ' ' : placeholder}
              type={inputType}
            />
          )}
          {placeholderWithAnimation && placeholder && (
            <label
              htmlFor={id}
              className={cn(
                'absolute text-[0.875rem] text-gray-500 !left-3 duration-300 transform -translate-y-4 scale-75 peer-placeholder-shown:top-2 peer-focus:top-3 top-3 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto',
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
              className={cn('absolute right-2.5  text-defaultText text-[20px] z-20 !top-2.5', {
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
              className={cn('absolute right-2.5 text-[20px] z-20 !top-2.5', {
                '!text-red-500': !!error,
              })}
            >
              {errorIcon}
            </span>
          )}
          <Tooltip id={id} />
        </div>
      </div>
    );
  }
);
