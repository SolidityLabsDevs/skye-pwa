'use client';
import cn from 'classnames';
import { customScrollbar } from 'constants/classNames';
import { Children, memo, useId } from 'react';
import { default as ReactSelect, Props, components } from 'react-select';
import { Tooltip } from 'react-tooltip';

const { ValueContainer, Placeholder, Control } = components;

import { BiErrorCircle } from 'react-icons/bi';
import { RequiredStar } from 'components/ui/RequiredStar';

export type Option = { label: string; value: string };

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props}>
        {props.selectProps.placeholder} <RequiredStar visible={props.selectProps.required} />
      </Placeholder>

      {Children.map(children, child => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
};

type TProps = {
  error?: string;
  wrpClassName?: string;
  fullWidth?: boolean;
  label?: string | React.ReactElement;
};

export const Select = memo(
  ({
    classNames,
    className,
    error,
    label,
    wrpClassName,
    fullWidth,
    required,
    ...props
  }: Props & TProps) => {
    const id = useId();

    return (
      <div className={cn('flex flex-col w-full gap-1', wrpClassName)}>
        {typeof label === 'string' && (
          <label className="text-defaultText opacity-80" htmlFor={id}>
            {label} <RequiredStar visible={required} />
          </label>
        )}
        {typeof label !== 'string' && label}
        <ReactSelect
          menuPortalTarget={document?.body}
          {...props}
          className={cn(
            'max-w-[350px] w-full shrink-0 !min-h-10',
            {
              '!w-full !max-w-full': fullWidth,
            },
            className
          )}
          classNames={{
            ...classNames,
            control: (...args) =>
              cn(
                '!rounded-[8px] !bg-onNeutralBg !border !border-default',
                { '!border-red-500': !!error },
                classNames?.control?.(...args)
              ),
            input: (...args) =>
              cn('!font-light !text-defaultText peer', classNames?.input?.(...args)),
            valueContainer: (...args) => cn('!py-1 !px-3', classNames?.valueContainer?.(...args)),
            singleValue: (...args) =>
              cn('!text-defaultText !text-[0.875rem]', classNames?.singleValue?.(...args)),
            placeholder: state =>
              cn(
                '!text-gray-500 !text-[0.875rem] !absolute !origin-top-left !scale-100  !transition-all !peer-focus-within:bg-[red]',
                {
                  '!scale-75 !translate-y-[-12px]': state.hasValue || state.selectProps.inputValue,
                },
                classNames?.placeholder?.(state)
              ),
            indicatorSeparator: (...args) =>
              cn('!hidden', classNames?.indicatorSeparator?.(...args)),
            multiValue: (...args) =>
              cn('!text-defaultText !bg-neutralBg', classNames?.multiValue?.(...args)),
            multiValueLabel: (...args) =>
              cn('!text-defaultText !text-[0.75rem]', classNames?.multiValueLabel?.(...args)),
            menu: (...args) =>
              cn('!text-defaultText !bg-onNeutralbg !rounded-[8px]', classNames?.menu?.(...args)),
            menuList: (...args) =>
              cn(
                classNames?.menuList?.(...args),
                '!text-defaultText !bg-onNeutralbg !rounded-[8px]',
                customScrollbar
              ),
            menuPortal: (...args) =>
              cn(
                classNames?.menuPortal?.(...args),
                '!text-defaultText !bg-onNeutralbg !rounded-[8px] z-[9999]'
              ),
            option: (...args) =>
              cn(
                classNames?.option?.(...args),
                '!text-defaultText !text-[0.75rem] !bg-onNeutralbg !rounded-[8px] hover:!opacity-80 hover:!bg-primaryBg hover:!cursor-pointer'
              ),
          }}
          styles={{
            option: base => ({ ...base, background: `var(--onNeutralBg)`, borderRadius: '8px' }),
            menuList: base => ({ ...base, background: `var(--onNeutralBg)`, borderRadius: '8px' }),
            menuPortal: base => ({
              ...base,
              background: `var(--onNeutralBg)`,
              borderRadius: '8px',
              zIndex: 9999,
            }),
          }}
          components={{
            ValueContainer: CustomValueContainer,
            Control: ({ children, ...props }) => {
              return (
                <Control {...props}>
                  {children}
                  {!!error && (
                    <span
                      data-tooltip-id={id}
                      data-tooltip-content={String(error)}
                      className={cn('z-20 absolute right-[2rem]', {
                        '!text-red-500': !!error,
                      })}
                    >
                      <BiErrorCircle size={24} />
                    </span>
                  )}
                  <Tooltip id={id} />
                </Control>
              );
            },
            ...props.components,
          }}
        />
      </div>
    );
  }
);
