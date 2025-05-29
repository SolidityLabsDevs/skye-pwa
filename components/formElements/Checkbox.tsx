import cn from 'classnames';
import { RequiredStar } from 'components/ui/RequiredStar';
import { ChangeEvent, FC, memo, useId } from 'react';

type CheckboxProps = {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  wrpClassName?: string;
  labelClassName?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: FC<CheckboxProps> = memo(
  ({ label, checked, disabled, onChange, labelClassName, wrpClassName, required = false }) => {
    const id = useId();

    return (
      <div className={cn('flex flex-row items-center', wrpClassName)}>
        <input
          checked={checked}
          className={cn('relative float-left  mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]')}
          type="checkbox"
          id={id}
          onChange={onChange}
          disabled={disabled}
        />
        {label && (
          <label
            className={cn(
              'inline-block pl-[0.15rem] hover:cursor-pointer text-defaultText',
              labelClassName
            )}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <RequiredStar visible={required} />
      </div>
    );
  }
);
