import { FC, PropsWithChildren, memo } from 'react';
import { DashboardLayout } from 'components/lib';
import { getLoginSession } from 'lib/auth';
import { notFound } from 'next/navigation';
import { TDashboardLink } from 'components/lib/dashboard/DashboardLink';

type LayoutProps = unknown;

const links = (path = '/dashboard/admin'): TDashboardLink[] => [
  {
    label: 'Dashboard',
    href: path,
    icon: 'RxDashboard',
  },
  {
    label: 'Tracks',
    href: `${path}/tracks`,
    icon: 'MdAudiotrack',
  },
];

// imported icon is a function (react component), but you cannot pass functions to client components (not in this case),
// so I moved all the used icons into dasboard layout component into const object

const Layout: FC<PropsWithChildren<LayoutProps>> = memo(async ({ children }) => {
  const session = await getLoginSession();
  if (session?.role !== 'ADMIN') notFound();

  return (
    <DashboardLayout containerClassName="!max-w-[1920px]" links={links()} withAccount>
      {children}
    </DashboardLayout>
  );
});

export default Layout;
