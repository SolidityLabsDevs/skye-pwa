'use client';
import { FC, memo } from 'react';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { kebabToTitle, toBreadcrumbs } from 'utils';
import Link from 'next/link';

type BreadcrumbsProps = {
  className?: string;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = memo(() => {
  const pathname = usePathname();

  const breadcrumbs = toBreadcrumbs(pathname, { nameTransform: kebabToTitle }).slice(1);

  return (
    <div className={cn('flex flex-row flex-wrap justify-between gap-4 mb-8')}>
      <div>
        <div className="text-[0.75rem] text-defaultText mb-2 flex flex-row gap-1">
          {breadcrumbs.map((item, idx) => (
            <Link href={item.path} key={item.path}>
              {item.name}
              {idx !== breadcrumbs.length - 1 ? ' / ' : ''}
            </Link>
          ))}
        </div>
        <p className="text-defaultText text-[0.875rem] font-bold">{breadcrumbs.at(-1)?.name}</p>
      </div>
    </div>
  );
});
