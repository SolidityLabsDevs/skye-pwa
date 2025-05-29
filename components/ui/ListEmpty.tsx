import { FC, memo } from 'react';
import cn from 'classnames';
import { Button } from 'components/ui/Button';

type ListEmptyProps = {
  text?: string;
  href?: string;
  hrefText?: string;
  className?: string;
};

export const ListEmpty: FC<ListEmptyProps> = memo(
  ({ text = 'List is empty', href, hrefText, className }) => {
    return (
      <div
        className={cn(
          'grid rounded-[12px] mb-4 p-5 bg-onNeutralBg xl:p-10 place-items-center',
          className
        )}
      >
        <p className="font-semibold text-defaultText">{text}</p>
        {href && (
          <Button theme="outline" className="mt-3" href={href}>
            {hrefText}
          </Button>
        )}
      </div>
    );
  }
);
