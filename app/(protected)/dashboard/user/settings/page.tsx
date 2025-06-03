import { MobileContainer } from 'components/lib/MobileContainer';
import Link from 'next/link';
import { FC, memo } from 'react';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      headerScreenTitle="Settings"
      showHeader
      className="flex flex-col gap-8"
      isStackScreen
    >
      <Link className="text-blue-500 underline" href="/dashboard/user/settings/voice">
        Voice
      </Link>
      <Link className="text-blue-500 underline" href="/dashboard/user/settings/volume">
        Volume
      </Link>
    </MobileContainer>
  );
});

export default Page;
