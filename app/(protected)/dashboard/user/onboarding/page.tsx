import { redirect } from 'next/navigation';
import { FC, memo } from 'react';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  redirect('/dashboard/user/onboarding/1');
});

export default Page;
