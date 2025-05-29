import { FC, memo } from 'react';
import cn from 'classnames';

import { FaStar } from 'react-icons/fa6';

import { AvatarsStack } from './AvatarsStack';

type AvatarsStackRatingTextProps = {
  boldText?: string;
  text?: string;
  className?: string;
};

export const AvatarsStackRatingText: FC<AvatarsStackRatingTextProps> = memo(
  ({ boldText = '100+', text = 'Lorem, ipsum', className }) => {
    return (
      <div className={cn('flex flex-row items-center gap-2', className)}>
        <AvatarsStack />
        <div>
          <div className="flex flex-row ">
            <FaStar color="#eab308" />
            <FaStar color="#eab308" />
            <FaStar color="#eab308" />
            <FaStar color="#eab308" />
            <FaStar color="#eab308" />
          </div>
          <label className="text-defaultText">
            <span className="font-bold">{boldText}</span> {text}
          </label>
        </div>
      </div>
    );
  }
);
