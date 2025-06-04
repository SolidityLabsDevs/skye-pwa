'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo } from 'react';
import { Button } from 'components/ui/Button';

type PageProps = unknown;

const number = 13;

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      showHeader
      className="flex flex-col items-center justify-center gap-6"
      bgClassName='bg-[url("/images/assets/7.png")] bg-cover bg-center bg-no-repeat'
      isStackScreen
    >
      <p className="font-bold text-[1.375rem] text-center">Your Score</p>
      <Image
        alt=""
        src={'/images/assets/18.svg'}
        width={0}
        height={0}
        className="w-full h-full max-w-[186px] max-h-[186px] aspect-square mx-auto"
      />
      <p className="text-center font-medium text-[2.813rem] block bg-clip-text text-transparent bg-[linear-gradient(to_right,_#8850a9_0%,_#e9a88f_100%)]">
        42%
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-[#e6e8f1] italic font-medium text-[1.625rem]">
            Subconscious Alignment
          </p>
          <p className="text-[#ccd0df] text-[0.75rem]">
            Right now, your inner beliefs are pulling you in a different direction than your goals.
            It’s not a flaw — it’s just the map your mind is using to survive.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-extrabold text-[#e6e8f1] text-[0.75rem]">
            Your subconscious isn’t broken
          </p>
          <p className="text-[#CCD0DF] text-[0.75rem]">
            It’s simply been wired by survival patterns, habits, and unconscious beliefs.
          </p>
        </div>
      </div>
      <p className="text-[0.625rem] text-center font-bold italic text-[#98a1bd]">
        Most users start between 30–50% — this is where change begins.
      </p>
      <Button theme="gradient" className="mx-auto mt-auto" href={`/onboarding/${number + 1}`}>
        Discover Your Subconscious Blocks
      </Button>
      <p className="text-[#98a1bd] text-center text-[0.563rem]">
        * This result is an indication only, not a medical diagnosis. For a definitive assessment,
        please contact your healthcare provider.
      </p>
    </MobileContainer>
  );
});

export default Page;
