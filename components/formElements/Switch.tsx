'use client';
import { FC, memo, useState } from 'react';
import cn from 'classnames';

type SwitchProps = {
  label?: string;
  className?: string;
  value?: boolean;
  onChange?: () => void;
};

export const Switch: FC<SwitchProps> = memo(({ label, className, value, onChange }) => {
  const [checked, setChecked] = useState(!!value);

  return (
    <button
      onClick={() => {
        setChecked(prev => !prev);
        onChange?.();
      }}
      className={cn('flex flex-row items-center shrink-0 gap-2', className)}
    >
      {label && <label className="text-defaultText text-[0.875rem]">{label}</label>}
      {!checked && (
        <span className="flex items-center w-12 justify-start !bg-default border border-default border-solid rounded-full cursor-pointer bg-gray">
          <span className="w-6 h-6 border rounded-full shadow bg-onNeutralBg border-default"></span>
        </span>
      )}
      {checked && (
        <span className="flex items-center justify-end w-12 border border-solid rounded-full cursor-pointer border-default bg-primary">
          <span className="w-6 h-6 border rounded-full shadow bg-onNeutralBg border-default"></span>
        </span>
      )}
    </button>
  );
});
