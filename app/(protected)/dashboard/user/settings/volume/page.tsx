'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo } from 'react';
import { Button } from 'components/ui/Button';

import { CustomSlider } from 'components/formElements/CustomSlider';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      showHeader
      className="flex flex-col gap-4"
      // bgClassName='bg-[url("/images/assets/6.png")] bg-cover bg-left-top bg-no-repeat'
      isStackScreen
    >
      <Image
        alt=""
        src="/images/assets/2.png"
        width={0}
        height={0}
        className="w-full h-full max-w-[170px] max-h-[203px] mx-auto"
      />
      <div className="h-10" />
      <p className="text-center font-bold text-[1.25rem] text=[#e7e8f1]">Let’s set your volume</p>
      <p className="text-center text-[0.75rem] text-[#ccd0df]">
        We recommend setting it above 50% for optimal subconscious absorption
      </p>
      <div className="h-10" />
      <CustomSlider
        onChange={() => null}
        max={100}
        min={1}
        value={50}
        leftLabel="Voice"
        rightLabel="Frequency"
        valueLabel="%"
      />
      <p className="text-center text-[0.875rem] text-[#ccd0df]">
        We recommend setting it above 50% for optimal subconscious absorption
      </p>
      <Button fullWidth theme="gradient" className="mt-auto" href="/dashboard">
        Save
      </Button>
    </MobileContainer>
  );
});

export default Page;
