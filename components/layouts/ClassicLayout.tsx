import cn from 'classnames';
import { FC, ReactElement, memo } from 'react';
import { customScrollbar } from 'constants/classNames';

type ClassicLayoutProps = {
  item1?: ReactElement;
  item2?: ReactElement;
  item3?: ReactElement;
  item4?: ReactElement;
  item5?: ReactElement;
};

export const ClassicLayout: FC<ClassicLayoutProps> = memo(
  ({ item1, item2, item3, item4, item5 }) => {
    return (
      <div className="flex flex-col min-h-full">
        {item1}
        <div className="grid grid-cols-[minmax(100px,_25%)_1fr_minmax(100px,_25%)] min-h-screen">
          <aside className="min-h-screen">{item2}</aside>
          <main className={cn('min-h-screen overflow-y-auto', customScrollbar)}>{item3}</main>
          <aside className="min-h-screen">{item4}</aside>
        </div>
        {item5}
      </div>
    );
  }
);
