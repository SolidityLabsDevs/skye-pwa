import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo } from 'react';

import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { FaPause } from 'react-icons/fa6';
import { TbRewindForward15, TbRewindBackward15 } from 'react-icons/tb';
import { Progress } from 'components/ui';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      isStackScreen
      showHeader
      headerScreenTitle={<HiOutlineSpeakerWave className="ml-auto" size={24} />}
      bgClassName='bg-[url("/images/assets/3.png")] bg-cover bg-left-top bg-no-repeat'
      className="flex flex-col items-center justify-between flex-1"
    >
      <div></div>
      <Image
        alt=""
        src="/images/assets/2.png"
        width={0}
        height={0}
        className="w-full h-full max-w-[272px] max-h-[324px] mx-auto"
      />
      <div className="flex flex-col w-full gap-8">
        <p className="text-[1.568rem] font-light text-center">001 Jesse's Intro</p>
        <div className="flex flex-row items-center justify-center gap-11">
          <TbRewindBackward15 size={20} />
          <FaPause size={30} />
          <TbRewindForward15 size={20} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Progress
            progress={2}
            className="w-full shrink-0"
            barClassName="[background:linear-gradient(to_right,_#47326B_0%,_#914372_50%,_#AC714F_100%)]"
          />
          <div className="w-full  shrink-0 flex flex-row justify-between gap-4 font-medium text-[#e6e7f2] text-[0.75rem]">
            <p>01:30</p>
            <p>45:00</p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
});

export default Page;
