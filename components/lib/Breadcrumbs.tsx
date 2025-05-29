'use client';
import { FC, memo } from 'react';
import { usePathname } from 'next/navigation';
import { kebabToTitle, toBreadcrumbs } from 'utils';
import Link from 'next/link';
import { ScreenTitle } from 'components/ui/ScreenTitle';

type BreadcrumbsProps = {
  className?: string;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = memo(() => {
  const pathname = usePathname();

  const breadcrumbs = toBreadcrumbs(pathname, { nameTransform: kebabToTitle }).slice(1);

  return (
    <ScreenTitle
      className="!mb-0"
      text={
        <div className="text-[0.75rem] text-defaultText  flex flex-wrap flex-row gap-1">
          {breadcrumbs.map((item, idx) => (
            <Link href={item.path} key={item.path}>
              {item.name}
              {idx !== breadcrumbs.length - 1 ? ' / ' : ''}
            </Link>
          ))}
        </div>
      }
      title={breadcrumbs.at(-1)?.name}
    />
  );
});
