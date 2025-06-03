'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo } from 'react';
import { Button } from 'components/ui/Button';
import { MdKeyboardArrowRight } from 'react-icons/md';

type PageProps = unknown;

const number = 16;

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      showHeader
      className="flex flex-col gap-8"
      bgClassName='bg-[url("/images/assets/7.png")] bg-cover bg-center bg-no-repeat'
      isStackScreen
    >
      <Image
        alt=""
        src="/images/assets/17.png"
        width={0}
        height={0}
        className="w-full h-full max-w-[200px] max-h-[200px] aspect-square mx-auto"
      />
      <div className="flex flex-col gap-4">
        <p className="text-center font-bold text-[1.25rem] mx-auto lg:max-w-[60%] text=[#e7e8f1]">
          But here’s the good news…
        </p>
        <p className="text-center text-[0.75rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          Your subconscious is also your superpower—once it’s reprogrammed to work for you.
        </p>
        <p className="text-center text-[0.75rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          That’s exactly what Skye was designed to do. Quietly. Repeatedly. Night after night.
        </p>
      </div>
      <Button theme='gradient' className="mx-auto mt-auto" href={`/onboarding/${number + 1}`}>
        Continue <MdKeyboardArrowRight />
      </Button>
    </MobileContainer>
  );
});

export default Page;
