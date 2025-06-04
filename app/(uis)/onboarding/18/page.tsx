'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import { FC, memo } from 'react';
import { Button } from 'components/ui/Button';
import Image from 'next/image';

type PageProps = unknown;

const DATA = [
  {
    title: 'Sleep more deeply',
    icon: '/images/assets/23.svg',
  },
  {
    title: 'Feel calmer inside',
    icon: '/images/assets/24.svg',
  },
  {
    title: 'Let go of emotional baggage',
    icon: '/images/assets/25.svg',
  },
  {
    title: 'Invite more abundance',
    icon: '/images/assets/26.svg',
  },
  {
    title: 'Attract love & connection',
    icon: '/images/assets/27.svg',
  },
  {
    title: 'Build lasting confidence',
    icon: '/images/assets/28.svg',
  },
  {
    title: 'Feel more centered and grounded',
    icon: '/images/assets/29.svg',
  },
  {
    title: 'Release limiting beliefs',
    icon: '/images/assets/30.svg',
  },
  {
    title: 'Break free from old patterns',
    icon: '/images/assets/31.svg',
  },
  {
    title: 'Sharpen focus & motivation',
    icon: '/images/assets/32.svg',
  },
  {
    title: 'Strengthen self-love',
    icon: '/images/assets/33.svg',
  },
];

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      showHeader
      className="flex flex-col gap-4"
      bgClassName='bg-[url("/images/assets/7.png")] bg-cover bg-center bg-no-repeat'
      isStackScreen
    >
      <div className="flex flex-col gap-2">
        <p className="font-bold text-center text-[#e8e8e8] opacity-80 text-[1.625rem]">
          Choose Your Reprogramming Goals
        </p>
        <p className="text-center text-[#98A1BD] text-[0.813rem]">
          Skye uses the science of sleep, sound, and suggestion to gently reshape the patterns that
          guide your life.
        </p>
      </div>
      {DATA.map(d => (
        <div
          key={d.title}
          style={{
            borderImage: 'url("/images/assets/34.svg") 1',
          }}
          className="border border-solid"
        >
          <div className="p-4 flex flex-row items-center gap-2.5">
            <Image width={22} height={22} alt="" src={d.icon} />
            <p className="text-[0.875rem]">{d.title}</p>
          </div>
        </div>
      ))}
      <Button fullWidth theme="gradient" className="mx-auto mt-auto" href={`/dashboard`}>
        Begin Your Transformation
      </Button>
    </MobileContainer>
  );
});

export default Page;
