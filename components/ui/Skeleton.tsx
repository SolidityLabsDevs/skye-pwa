import { FC, memo } from 'react';
import cn from 'classnames';

export type SkeletonProps = {
  className?: string;
  rows?: number;
  type?: 'title' | 'avatar' | 'post' | 'image';
  size?: number;
};

const classes = 'block h-2 bg-gray-200 rounded-full animate-pulse dark:bg-gray-700';

export const Skeleton: FC<SkeletonProps> = memo(({ className, type, size = 40, rows = 1 }) => {
  if (type === 'avatar') {
    return (
      <label
        className={cn(classes, 'rounded-full', className)}
        style={{ width: size, height: size }}
      ></label>
    );
  }

  return new Array(rows).fill(null).map((_, idx) => (
    <label
      key={idx}
      className={cn(
        classes,
        {
          'my-1': rows > 1,
        },
        className
      )}
    ></label>
  ));
});
