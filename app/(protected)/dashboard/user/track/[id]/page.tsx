'use client';

import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo } from 'react';

import { RiUser3Line } from 'react-icons/ri';
import { Days } from 'components/local/Days';
import { DaysChallenge } from 'components/local/DaysChallenge';
import { Track } from 'components/local/Track';
import { useModalStore } from 'stores';
import { useAudioOverviewContext } from 'contexts';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  const showModal = useModalStore(state => state.show);

  const { audio } = useAudioOverviewContext();

  return (
    <MobileContainer
      showHeader
      isStackScreen
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
      <Track audio={audio} />
      <div className="flex flex-col gap-5">
        <p className="italic font-bold text-left">About Your Script</p>
        <div
          className="font-light text-[#98a1bd]"
          dangerouslySetInnerHTML={{ __html: audio?.about_your_script || '' }}
        />
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
        <div dangerouslySetInnerHTML={{ __html: audio?.how_it_works || '' }} />

        <p className="text-[#98a1bd]">What You’ll Feel After Listening:</p>
        <div dangerouslySetInnerHTML={{ __html: audio?.what_you_will_feel || '' }} />
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
        <div dangerouslySetInnerHTML={{ __html: audio?.how_to_listen_for_maximum_effect || '' }} />
      </div>
    </MobileContainer>
  );
});

export default Page;
