import cn from 'classnames';
import { appConfig } from 'config/appConfig';
import Image from 'next/image';
import { FC, memo, useId } from 'react';

export type AvatarProps = {
  src?: string;
  size?: number;
  rounded?: boolean;
  border?: boolean;
  className?: string;
};

export const Avatar: FC<AvatarProps> = memo(
  ({ src = appConfig.LOGO, size = 40, rounded, border, className }) => {
    const id = useId();

    return (
      <Image
        width={size}
        height={size}
        className={cn(
          'rounded !shrink-0 object-cover',
          {
            'rounded-full': rounded,
            'ring-2 ring-default': border,
          },
          className
        )}
        src={src}
        alt={`avatar-${id}`}
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }
);
