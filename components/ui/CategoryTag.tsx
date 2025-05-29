'use client';
import cn from 'classnames';
import { FC, memo } from 'react';

type CategoryTagProps = {
  value: string;
  onChange?: (val: string) => void;
  className?: string;
  disabled?: boolean;
  active?: boolean;
};

export const CategoryTag: FC<CategoryTagProps> = memo(({ value, onChange, disabled, active }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onChange?.(value)}
      className={cn(
        'text-[0.875rem] min-w-[70px] shrink-0 px-[10px] py-[5px] text-defaultText bg-neutralBg h-max w-max rounded-[10px]',
        {
          '!bg-primaryForeground !text-primary': active,
        }
      )}
    >
      {value}
    </button>
  );
});
