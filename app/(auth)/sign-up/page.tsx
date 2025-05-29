'use client';
import { FC, memo } from 'react';

import { SignUpForm2 } from 'components/forms/SignUpForm2';
import { MobileContainer } from 'components/lib/MobileContainer';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer className="flex items-center justify-center p-5">
      <SignUpForm2 />
    </MobileContainer>
  );
});

export default Page;
