import { MobileContainer } from 'components/lib/MobileContainer';
import { Days } from 'components/local/Days';
import { DaysChallenge } from 'components/local/DaysChallenge';
import { ProfileCard } from 'components/local/ProfileCard';
import { Button } from 'components/ui/Button';
import Image from 'next/image';
import { FC, Fragment, memo } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

type PageProps = unknown;

const GOALS = [
  {
    icon: '😴',
    title: 'Sleep more deeply',
    description:
      'You’re training your mind to quiet nighttime chatter and settle into deeper, more restorative sleep states.',
  },
  {
    icon: '😌',
    title: 'Feel calmer inside',
    description:
      'Your breath and thoughts are syncing to calmer rhythms—restoring emotional balance from within.',
  },
  {
    icon: '🌿',
    title: 'Let go of emotional baggage',
    description:
      'Your subconscious is gently releasing stored patterns and reframing past experiences as you rest.',
  },
  {
    icon: '🕊️',
    title: 'Invite more abundance',
    description:
      'You’re rewiring deep beliefs around scarcity and opening your mind to receive more—effortlessly.',
  },
  {
    icon: '💕',
    title: 'Attract love & connection',
    description:
      'You’re strengthening self-worth and inner safety, creating space for deeper connection and love.',
  },
  {
    icon: '💪',
    title: 'Build lasting confidence',
    description:
      'Your inner voice is being retrained to reflect your strength, value, and capability—even while you sleep.',
  },
];

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      showHeader
      className="flex flex-col gap-8"
      bgClassName='bg-[url("/images/assets/6.png")] bg-cover bg-left-top bg-no-repeat'
      isStackScreen
    >
      <Image
        alt=""
        src="/images/assets/2.png"
        width={0}
        height={0}
        className="w-full h-full max-w-[70px] max-h-[84px] mx-auto"
      />
      <p className="text-[#e8e8e8] text-[1.5rem] font-bold text-center">Zach</p>
      <Days />
      <ProfileCard />
      <DaysChallenge />
      <div className="flex flex-col gap-5">
        <p className="italic font-bold text-left">Our Goals</p>
        <div className="rounded-[15px] p-6 bg-[rgba(242,_243,_247,_0.1)]">
          {GOALS.map((goal, index) => (
            <Fragment key={index}>
              <div className="flex items-start gap-4">
                <div className="">{goal.icon}</div>
                <div>
                  <h3 className="text-[0.813rem] font-medium text-[#e7e7e7]">{goal.title}</h3>
                  <p className="mt-1 text-[0.625rem] text-[rgba(rgb(148,_148,_148),_0.8)]">
                    {goal.description}
                  </p>
                </div>
              </div>
              {index !== GOALS.length - 1 && (
                <div className="w-1/2 my-4 h-px mx-auto bg-[#657792]" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <Button theme="gradient" pill className="mx-auto">
        Change Your Track <MdOutlineKeyboardArrowRight size={24} />
      </Button>
    </MobileContainer>
  );
});

export default Page;
