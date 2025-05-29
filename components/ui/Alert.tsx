import { FC, PropsWithChildren, memo } from 'react';
import cn from 'classnames';

import { MdCheckCircleOutline, MdErrorOutline, MdWarningAmber } from 'react-icons/md';
import { IoMdInformationCircleOutline } from 'react-icons/io';

type AlertProps = {
  type?: 'info' | 'warning' | 'error' | 'success';
  className?: string;
  titleClassName?: string;
  title?: string;
};

const icon = {
  info: <IoMdInformationCircleOutline className="text-blue-500" size={24} />,
  warning: <MdWarningAmber className="text-yellow-500" size={24} />,
  error: <MdErrorOutline className="text-red-500" size={24} />,
  success: <MdCheckCircleOutline className="text-green-500" size={24} />,
};

export const Alert: FC<PropsWithChildren<AlertProps>> = memo(
  ({ children, titleClassName, type = 'error', className, title }) => {
    return (
      <div
        className={cn(
          'rounded-[12px] bg-onNeutralBg p-4 w-full border-l-4',
          {
            'border-l-red-500': type === 'error',
            'border-l-yellow-500': type === 'warning',
            'border-l-blue-500': type === 'info',
            'border-l-green-500': type === 'success',
          },
          className
        )}
      >
        <div
          className={cn('mb-4 text-defaultText flex flex-row gap-2 items-center', titleClassName)}
        >
          {icon[type]} {title}
        </div>
        {children}
      </div>
    );
  }
);
