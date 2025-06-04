import { FC, memo, useEffect, useState } from 'react';
import cn from 'classnames';

type CustomCheckboxProps = {
  label?: string;
  onChange?: (val: boolean) => void;
  initialChecked?: boolean;
  className?: string;
};

export const CustomCheckbox: FC<CustomCheckboxProps> = memo(
  ({ label, initialChecked, onChange, className }) => {
    const [checked, setChecked] = useState(!!initialChecked);

    useEffect(() => {
      onChange?.(checked);
    }, [checked]);

    return (
      <div
        onClick={() => setChecked(!checked)}
        className={cn(
          'flex items-center border border-default border-solid w-full bg-[#231f23] gap-4 p-4 rounded-[32px] cursor-pointer transition-colors duration-200',
          {},
          className
        )}
      >
        <div
          className={cn('border-gray-600 bg-[#333] rounded-[2px] shrink-0 w-4 h-4', {
            'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-transparent': checked,
          })}
        >
          {checked && (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="text-[#eff0f0] text-[0.875rem]">{label}</span>
      </div>
    );
  }
);
