import { FC } from 'react';

type CustomSliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  valueLabel?: string;
};

export const CustomSlider: FC<CustomSliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  leftLabel = 'Min',
  rightLabel = 'Max',
  valueLabel = '',
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md px-4 py-8">
      <div className="mb-6 text-6xl font-extrabold text-white">
        {value}
        {valueLabel}
      </div>

      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none bg-gray-500 
                     accent-white focus:outline-none [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:h-9 
                     [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:shadow-md 
                     [&::-moz-range-thumb]:w-9 [&::-moz-range-thumb]:h-9 
                     [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:shadow-md"
        />

        <div className="flex justify-between mt-3 text-sm text-white">
          <span className="text-[0.813rem] font-light opacity-80">{leftLabel}</span>
          <span className="text-[0.813rem] font-light opacity-80">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
};
