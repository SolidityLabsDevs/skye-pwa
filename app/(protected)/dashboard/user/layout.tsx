import { getLoginSession } from 'lib/auth';
import { notFound } from 'next/navigation';
import { FC, PropsWithChildren, memo } from 'react';

type LayoutProps = unknown;

// icons was a function, but you cannot pass functions to client components (not in this case),
// so I moved all the used icons into dasboard layout component into const object

const Layout: FC<PropsWithChildren<LayoutProps>> = memo(async ({ children }) => {
  const session = await getLoginSession();
  if (session?.role !== 'USER') notFound();

  return <>{children}</>;
});

export default Layout;
