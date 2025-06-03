'use client';
import cn from 'classnames';
import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo } from 'react';
import { Button } from 'components/ui/Button';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { SwipableScroll } from 'components/ui/SwipableScroll';

type PageProps = unknown;

const number = 17;

const DATA = [
  {
    id: 1,
    image: '/images/assets/19.png',
    content: (
      <>
        <div className="text-center flex flex-col gap-4 items-center justify-center font-bold text-[1.25rem] mx-auto lg:max-w-[60%] text=[#e7e8f1]">
          Welcome to <Image height={39} width={67} alt="" src="/images/assets/4.svg" />
        </div>
        <p className="text-center text-[0.75rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          Your subconscious is also your superpower—once it’s reprogrammed to work for you.
        </p>
        <p className="text-center font-bold italic mt-8 text-[0.625rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          That’s exactly what Skye was designed to do. Quietly. Repeatedly. Night after night.
        </p>
      </>
    ),
  },
  {
    id: 2,
    image: '/images/assets/20.png',
    content: (
      <>
        <div className="text-center flex flex-col gap-4 items-center justify-center font-bold text-[1.25rem] mx-auto lg:max-w-[60%] text=[#e7e8f1]">
          Why Skye Works While You Sleep
        </div>
        <p className="text-center text-[0.75rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          As your body begins to rest, your brain transitions into slower rhythms.
        </p>
        <p className="text-center font-bold italic mt-8 text-[0.625rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          These are called theta and delta states — windows where your mind becomes up to 6x more
          suggestible.
        </p>
      </>
    ),
  },
  {
    id: 3,
    image: '/images/assets/21.png',
    content: (
      <>
        <div className="text-center flex flex-col gap-4 items-center justify-center font-bold text-[1.25rem] mx-auto lg:max-w-[60%] text=[#e7e8f1]">
          The Power of Frequency
        </div>
        <p className="text-center text-[0.75rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          Some sounds don’t just calm you — they prepare your{' '}
          <span className="font-bold">nervous system</span> to receive. <br />
          Frequencies like 528Hz have been shown to reduce stress by up to{' '}
          <span className="font-bold">65% in a single session.</span>
        </p>
        <p className="text-center font-bold italic mt-8 text-[0.625rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          Skye uses these tones to soften your defenses and help new beliefs take root — gently,
          while you sleep
        </p>
      </>
    ),
  },
  {
    id: 4,
    image: '/images/assets/22.png',
    content: (
      <>
        <div className="text-center flex flex-col gap-4 items-center justify-center font-bold text-[1.25rem] mx-auto lg:max-w-[60%] text=[#e7e8f1]">
          Repetition Rewires Belief
        </div>
        <p className="text-center text-[0.75rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          Your brain is constantly rewiring itself. In relaxed states, each repeated thought
          strengthens a neural pathway. This is called{' '}
          <span className="font-bold">synaptic plasticity</span> — your brain’s way of turning
          repetition into belief. <br />
          In just <span className="font-bold">21–30 nights</span>, your emotional patterns and inner
          voice begin to shift
        </p>
        <p className="text-center font-bold italic mt-8 text-[0.625rem] text-[#ccd0df]  mx-auto lg:max-w-[70%]">
          That’s what Skye was made for.
        </p>
      </>
    ),
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
                  {item?.content}
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
