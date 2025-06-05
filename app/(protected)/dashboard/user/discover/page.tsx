'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import { AudioList } from 'components/local/AudioList';
import { WeekDays2 } from 'components/local/WeekDays2';
import { Button } from 'components/ui/Button';
import Image from 'next/image';
import { FC, memo } from 'react';
import { useUserStore } from 'stores';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  const user = useUserStore(state => state.user);

  return (
    <MobileContainer
      showHeader
      showTabbar
      bgClassName='bg-[url("/images/assets/3.png")] bg-cover bg-left-top bg-no-repeat'
      headerScreenTitle={
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <Image src="/images/assets/4.svg" alt="" width={73} height={34} />
        </div>
      }
      screenTitle={<WeekDays2 />}
      className="flex flex-col gap-8"
    >
      <Image alt="" src="/images/assets/15.svg" width={0} height={0} className="w-full h-auto" />
      {!user?.answers && (
        <Button
          fullWidth
          theme="gradient"
          href={`/dashboard/${user?.role?.toLowerCase()}/onboarding`}
        >
          Open Onboarding
        </Button>
      )}
      <div className="flex flex-col gap-3">
        <p className="font-thin italic text-[#ebeaec]">PROGRAMS</p>
        <AudioList />
        <div className="flex-row items-stretch justify-between hidden gap-5 //flex">
          <div className="flex flex-col w-1/2 gap-2">
            <Image
              src="/images/assets/11.png"
              alt=""
              width={0}
              height={0}
              className="w-full h-auto rounded-[24px]"
            />
            <p className="text-[#e6e7f2] font-thin">Quantum Shift</p>
            <p className="text-[#98a1bd] text-[0.688rem]">45 MIN • 427 hz</p>
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <Image
              src="/images/assets/14.png"
              alt=""
              width={0}
              height={0}
              className="w-full h-auto rounded-[24px]"
            />
            <p className="text-[#e6e7f2] font-thin">Mystical Dreams</p>
            <p className="text-[#98a1bd] text-[0.688rem]">45 MIN • 427 hz</p>
          </div>
        </div>
      </div>
      <div className="flex-col hidden gap-3 //flex">
        <p className="font-thin italic text-[#ebeaec]">7 DAY TRANSFORMATION</p>
        <div className="flex flex-row items-stretch justify-between gap-5">
          <div className="flex flex-col w-1/2 gap-2">
            <Image
              src="/images/assets/13.png"
              alt=""
              width={0}
              height={0}
              className="w-full h-auto rounded-[24px]"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <Image
              src="/images/assets/12.png"
              alt=""
              width={0}
              height={0}
              className="w-full h-auto rounded-[24px]"
            />
          </div>
        </div>
      </div>
    </MobileContainer>
  );
});

export default Page;
