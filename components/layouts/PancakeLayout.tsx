import { FC, ReactElement, ReactNode, memo } from 'react';

type PancakeLayoutProps = {
  item1?: ReactElement;
  item2?: ReactNode;
  item3?: ReactElement;
};

export const PancakeLayout: FC<PancakeLayoutProps> = memo(({ item1, item2, item3 }) => {
  return (
    <div className="flex flex-col min-h-full">
      {item1}
      <main className="flex justify-center flex-auto min-h-screen">{item2}</main>
      {item3}
    </div>
  );
});
