'use client';

import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo } from 'react';

import { RiUser3Line } from 'react-icons/ri';
import { Days } from 'components/local/Days';
import { DaysChallenge } from 'components/local/DaysChallenge';
import { Track } from 'components/local/Track';
import { useModalStore } from 'stores';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  const showModal = useModalStore(state => state.show);

  return (
    <MobileContainer
      showHeader
      headerScreenTitle={
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <Image src="/images/assets/4.svg" alt="" width={73} height={34} />
          <button onClick={() => showModal('YourPortal', {})}>
            <RiUser3Line size={24} />
          </button>
        </div>
      }
      bgClassName='bg-[url("/images/assets/6.png")] bg-cover bg-left-top bg-no-repeat'
      className="flex flex-col gap-6"
    >
      <Days />
      <DaysChallenge />
      <Image
        alt=""
        src="/images/assets/2.png"
        width={0}
        height={0}
        className="my-14 w-full h-full max-w-[173px] max-h-[207px] mx-auto"
      />
      <Track />
      <div className="flex flex-col gap-5">
        <p className="italic font-bold text-left">About Your Script</p>
        <p className="font-light text-[#98a1bd]">
          Fear and doubt hold us back from stepping into our full potential. This deep subconscious
          reprogramming challenge will help you{' '}
          <span className="italic font-bold">release limiting beliefs</span>, dissolve inner
          resistance, and replace fear with unwavering confidence. Your mind will be guided into a
          state of surrender, rewiring your subconscious to{' '}
          <span className="italic font-bold">embrace trust, courage, and self-belief.</span>
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <p className="italic font-bold text-left">Frequency Selection</p>
        <div>
          <p className="text-[1.5rem] text-center block bg-clip-text text-transparent bg-[linear-gradient(to_right,_#8850a9_0%,_#e9a88f_100%)]">
            396 Hz
          </p>
          <p className="text-[1.5rem] text-center block bg-clip-text text-transparent bg-[linear-gradient(to_right,_#8850a9_0%,_#e9a88f_100%)]">
            The Frequency of Release
          </p>
        </div>
        <p className="text-[#98a1bd]">How It Works:</p>
        <ul className="pl-5 list-disc list-outside text-[#98a1bd]">
          <li className="">
            Scientifically, 396 Hz resonates with the body’s{' '}
            <span className="italic font-bold">lower energy centers</span>, shifting your brainwaves
            into a state of release where{' '}
            <span className="italic font-bold">fear is naturally neutralized.</span>
          </li>
          <li className="">
            Spiritually, it is known as the{' '}
            <span className="italic font-bold">Root Chakra Healing Frequency</span>, helping you
            feel safe, grounded, and free from inner resistance.
          </li>
        </ul>
        <p className="text-[#98a1bd]">What You’ll Feel After Listening:</p>
        <ul className="pl-5 list-disc list-outside text-[#98a1bd]">
          <li className="">
            A deep sense of <span className="italic font-bold">emotional lightness</span>, as if old
            baggage is finally gone.
          </li>
          <li className="">
            Increased <span className="italic font-bold">confidence</span> in your decisions and
            actions.
          </li>
          <li className="">
            A <span className="italic font-bold">quiet mind</span> — no more overthinking or
            self-doubt loops.
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-20">
        <p className="italic font-bold text-center">How to Listen for Maximum Effect</p>
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-center font-medium text-[1.25rem] block bg-clip-text text-transparent bg-[linear-gradient(to_right,_#8850a9_0%,_#e9a88f_100%)]">
              7 DAYS
            </p>
            <p className="text-[0.563rem] text-center font-light text-[#98a1bd]">INITIAL SHIFT</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-center font-medium text-[1.875rem] block bg-clip-text text-transparent bg-[linear-gradient(to_right,_#8850a9_0%,_#e9a88f_100%)]">
              21 DAYS
            </p>
            <p className="text-[0.688rem] text-center font-light text-[#98a1bd]">
              FULL TRANSFORMATION
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-center font-medium text-[1.25rem] block bg-clip-text text-transparent bg-[linear-gradient(to_right,_#8850a9_0%,_#e9a88f_100%)]">
              14 DAYS
            </p>
            <p className="text-[0.563rem] text-center font-light text-[#98a1bd]">
              DEEP INTEGRATION
            </p>
          </div>
        </div>
        <p className="font-light text-[#98a1bd]">
          The subconscious <span className="italic font-bold">does not change instantly</span> — it
          learns through <span className="italic font-bold">reinforcement</span>. Every time you
          listen, the affirmations and frequencies{' '}
          <span className="italic font-bold">strengthen new neural pathways</span>, replacing old
          fear-based patterns with self-trust and confidence. 21 days of consistent listening is the
          key to <span className="italic font-bold">deep, lasting transformation.</span>
        </p>
      </div>
    </MobileContainer>
  );
});

export default Page;
