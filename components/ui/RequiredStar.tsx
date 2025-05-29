import { FC, memo } from 'react';
import cn from 'classnames';

type RequiredStarProps = {
  className?: string;
  visible?: boolean;
};

export const RequiredStar: FC<RequiredStarProps> = memo(({ className, visible = false }) => {
  return (
    <span
      className={cn('text-red-500', className, {
        hidden: !visible,
      })}
    >
      *
    </span>
  );
});
