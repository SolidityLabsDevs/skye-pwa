import { Container } from 'components/ui/Container';
import cn from 'classnames';
import { FC, ReactElement, memo } from 'react';
import { customScrollbar } from 'constants/classNames';

type SidebarLayoutProps = {
  item1?: ReactElement;
  item2?: ReactElement;
};

export const SidebarLayout: FC<SidebarLayoutProps> = memo(({ item1, item2 }) => {
  return (
    <Container className="grid grid-cols-[minmax(100px,_25%)_1fr]" px>
      <aside className="min-h-screen">{item1}</aside>
      <main className={cn('min-h-screen overflow-y-auto', customScrollbar)}>{item2}</main>
    </Container>
  );
});
