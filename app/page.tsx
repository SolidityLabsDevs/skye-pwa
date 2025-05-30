import Link from 'next/link';
import { FC, memo } from 'react';

type PageProps = unknown;

const href = [
  '/onboarding/1',
  '/onboarding/2',
  '/onboarding/3',
  '/onboarding/4',
  '/onboarding/5',
  '/onboarding/6',
  '/onboarding/7',
  '/onboarding/8',
  '/onboarding/9',
  '/onboarding/10',
  '/onboarding/11',
  '/1',
  '/2',
  '/3',
  '/4',
  '/5',
  '/6',
];

const Page: FC<PageProps> = memo(() => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {href.map(h => (
        <Link className="text-blue-500 underline" href={h} key={h}>
          {h}
        </Link>
      ))}
    </div>
  );
});

export default Page;
