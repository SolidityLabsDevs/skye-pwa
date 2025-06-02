'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import { Button } from 'components/ui/Button';
import Image from 'next/image';
import { FC, memo } from 'react';

import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { SignInForm2 } from 'components/forms/SignInForm2';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      bgClassName='bg-[url("/images/assets/5.png")] bg-cover bg-center'
      className="flex flex-col items-center justify-center flex-1"
    >
      <Image
        alt=""
        width={0}
        height={0}
        src="/images/assets/2.png"
        className="w-full max-w-[192px] h-full max-h-[229px] mx-auto my-20"
      />
      <div className="text-[1.75rem] font-light flex flex-row gap-2 items-center text-center justify-center">
        Join the <Image height={39} width={67} alt="" src="/images/assets/4.svg" /> Community
      </div>
      <div className="flex flex-col w-full gap-4 mx-auto mt-8 shrink-0">
        <SignInForm2 />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-8 text-center mt-14">
        <Button theme="gradient" pill fullWidth>
          Skip For Now <MdOutlineKeyboardArrowRight size={24} />
        </Button>
        <div className="flex flex-row items-center gap-2 text-center">
          <p>Want to skip this step?</p>{' '}
          <Link href="/onboarding" className="text-[#a76855]">
            Skip
          </Link>
        </div>
      </div>
    </MobileContainer>
  );
});

export default Page;
