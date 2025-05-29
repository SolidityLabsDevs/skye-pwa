'use client';
import { FC, memo } from 'react';

import { SignInForm2 } from 'components/forms/SignInForm2';
import { MobileContainer } from 'components/lib/MobileContainer';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer className="flex items-center justify-center p-5">
      <SignInForm2 />
    </MobileContainer>
  );
});

export default Page;
