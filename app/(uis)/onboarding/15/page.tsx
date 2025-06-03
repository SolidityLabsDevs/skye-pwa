'use client';
import cn from 'classnames';
import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo } from 'react';
import { Button } from 'components/ui/Button';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { SwipableScroll } from 'components/ui/SwipableScroll';

type PageProps = unknown;

const number = 15;

const DATA = [
  {
    id: 1,
    image: '/images/assets/2.png',
    title: 'Your Wired For Survival Not Success',
    text: 'From birth, your subconscious was trained to detect threats—not possibilities.',
    text_2:
      '“95% of your decisions are made automatically by subconscious patterns formed before age 7.” (Dr. Bruce Lipton, Cell Biologist)',
  },
  {
    id: 2,
    image: '/images/assets/2.png',
    title: 'What You Hear is What You Believe',
    text: 'Critical voices, childhood messaging, and cultural noise become internal truth—without your permission.',
    text_2:
      '“Neural pathways for negative self-talk become dominant without intentional intervention.” (Stanford Neuroplasticity Lab)',
  },
  {
    id: 3,
    image: '/images/assets/2.png',
    title: 'Your Subconscious Loves Familiar',
    text: 'That’s why we repeat old habits, stay in toxic dynamics, or feel ‘stuck’ even when we know better.',
    text_2:
      '“Familiarity activates the brain’s safety system—even when outcomes are harmful.” (Harvard Mind, Brain & Behavior Initiative)',
  },
  {
    id: 4,
    image: '/images/assets/2.png',
    title: 'Stress Deepens Patterns',
    text: `When you're anxious, the subconscious records what you’re thinking and feeling—and replays it later.`,
    text_2:
      '“Humans think 60,000 thoughts per day—over 90% are the same as yesterday.” (National Science Foundation)',
  },
  {
    id: 5,
    image: '/images/assets/2.png',
    title: 'Your Mind Is Looping Old Stories',
    text: 'Unless rewired, your inner programming keeps choosing the same emotions, thoughts, and outcomes—on autopilot.',
    text_2:
      '“Humans think 60,000 thoughts per day—over 90% are the same as yesterday.” (National Science Foundation)',
  },
];

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      showHeader
      className="flex flex-col items-center justify-center gap-8"
      bgClassName='bg-[url("/images/assets/7.png")] bg-cover bg-center bg-no-repeat'
      isStackScreen
    >
      <SwipableScroll showProgressBar={false} dataLength={DATA.length}>
        {({ className, width }) => {
          return (
            <>
              {DATA.map(item => (
                <div
                  key={item.id}
                  style={{ ...(width > 0 ? { width } : {}) }}
                  className={cn('flex flex-col gap-4 lg:w-[540px] w-full max-w-[540px]', className)}
                >
                  <Image
                    alt=""
                    src={item?.image}
                    width={0}
                    height={0}
                    className="w-full h-full max-w-[172px] max-h-[204px] aspect-square mx-auto"
                  />
                  <p className="text-center font-bold text-[1.25rem] mx-auto lg:max-w-[60%] text=[#e7e8f1]">
                    {item?.title}
                  </p>
                  <p className="text-center text-[0.75rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
                    {item?.text}
                  </p>
                  <p className="text-center font-bold italic mt-8 text-[0.625rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
                    {item?.text_2}
                  </p>
                </div>
              ))}
            </>
          );
        }}
      </SwipableScroll>
      <Button theme='gradient' className="mx-auto mt-auto" href={`/onboarding/${number + 1}`}>
        Continue <MdKeyboardArrowRight />
      </Button>
    </MobileContainer>
  );
});

export default Page;
