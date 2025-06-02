import { MobileContainer } from 'components/lib/MobileContainer';
import { WeekDays } from 'components/local/WeekDays';
import { Button } from 'components/ui/Button';
import Image from 'next/image';
import { FC, memo } from 'react';

import { LuShare } from 'react-icons/lu';
import { FaArrowTrendUp } from 'react-icons/fa6';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      showHeader
      className="flex flex-col gap-12"
      bgClassName='bg-[url("/images/assets/3.png")] bg-cover bg-left-top bg-no-repeat'
      headerScreenTitle={
        <div className="flex flex-row items-start justify-between w-full gap-4">
          <div>
            <p className="text-[#e8e8e8] font-bold text-[1.25rem]">Subconscious Alignment</p>
            <p className="text-[1.125rem] font-bold text-[#797979]">Zach</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-[0.875rem] text-[#bdbfc2]">Share</p>{' '}
            <LuShare size={14} color="#bdbfc2" />
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6 mx-auto mt-20">
        <Image alt="" src="/images/assets/10.svg" width={116} height={130} />
        <div className="flex flex-row items-center gap-2">
          <span className="text-[2.813rem] font-medium block bg-clip-text text-transparent bg-[linear-gradient(to_right,_#8850a9_0%,_#e9a88f_100%)]">
            52%
          </span>
          <div className="text-[#00c24a] flex flex-row gap-0.5 items-center">
            +5 <FaArrowTrendUp />{' '}
          </div>
        </div>
      </div>
      <WeekDays />
      <div className="flex flex-col gap-6">
        <div className="flex flex-row rounded-[24px] bg-[#27252d] justify-center mx-auto">
          <div className="px-6 py-2 rounded-[24px] bg-[#27252d] text-[0.875rem] text-[#98a1bd]">
            Today
          </div>
          <div className="px-6 py-2 rounded-[24px]  bg-[#27252d] text-[0.875rem] text-[#98a1bd]">
            This Week
          </div>
          <div className="px-6 py-2 rounded-[24px] bg-[#45444a] text-[0.875rem] text-[#e6e8f1]">
            This Month
          </div>
        </div>
        <Image alt="" src="/images/assets/16.svg" width={0} height={0} className="w-full h-auto" />
        <p className="text-[#98a1bd] font-light">
          The Subconscious Alignment Score measures how closely your inner patterns match the life
          you want to create.
        </p>
        <p className="text-[#98a1bd] font-light">We look at:</p>
        <ul className="pl-5 list-disc list-outside text-[#98a1bd]">
          <li className="">How you speak to yourself</li>
          <li className="">Your core beliefs about change</li>
          <li className="">Emotional habits and hidden resistance</li>
          <li className="">Openness to new ways of thinking and feeling</li>
        </ul>
        <p className="text-[#98a1bd] font-light">
          These questions don’t test how “good” or “bad” you are—they reveal how your subconscious
          mind has been wired by past experiences, emotional memory, and repetition.
        </p>
        <p className="italic font-bold">Your subconscious is shaping your reality—every day.</p>
        <Button fullWidth theme="gradient">
          Your Programming Plan
        </Button>
      </div>
    </MobileContainer>
  );
});

export default Page;
