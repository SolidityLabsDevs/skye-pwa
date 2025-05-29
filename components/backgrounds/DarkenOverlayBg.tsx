import cn from 'classnames';
import { FC, memo } from 'react';

type DarkenOverlayBgProps = {
  className?: string;
};

export const DarkenOverlayBg: FC<DarkenOverlayBgProps> = memo(({ className }) => {
  return (
    <div
      className={cn(
        'absolute inset-0 !z-0 w-full h-full bg-gradient-to-t from-black/50 via-black/20 to-bg-black-10',
        className
      )}
    />
  );
});
