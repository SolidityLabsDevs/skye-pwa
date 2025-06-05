'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import Image from 'next/image';
import { FC, memo, useEffect, useRef, useState } from 'react';

import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { FaPause, FaPlay } from 'react-icons/fa6';
import { TbRewindForward15, TbRewindBackward15 } from 'react-icons/tb';
import { Progress } from 'components/ui/Progress';
import { useAudioOverviewContext } from 'contexts';

type PageProps = unknown;

const Page: FC<PageProps> = memo(() => {
  const { audio } = useAudioOverviewContext();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (audioEl.paused) {
      audioEl.play();
      setIsPlaying(true);
    } else {
      audioEl.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const updateTime = () => setCurrentTime(audioEl.currentTime);
    const updateDuration = () => setDuration(audioEl.duration);

    audioEl.addEventListener('timeupdate', updateTime);
    audioEl.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audioEl.removeEventListener('timeupdate', updateTime);
      audioEl.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <MobileContainer
      isStackScreen
      showHeader
      headerScreenTitle={<HiOutlineSpeakerWave className="ml-auto" size={24} />}
      bgClassName='bg-[url("/images/assets/3.png")] bg-cover bg-left-top bg-no-repeat'
      className="flex flex-col items-center justify-between flex-1"
    >
      <div></div>

      <audio ref={audioRef} src={audio?.audioFile?.url || ''} preload="metadata" />

      <Image
        alt=""
        src={audio?.audioCoverImage?.base64 || audio?.audioCoverImage?.url || ''}
        width={0}
        height={0}
        className="w-full h-full max-w-[272px] max-h-[324px] mx-auto"
      />

      <div className="flex flex-col w-full gap-8">
        <p className="text-[1.568rem] font-light text-center">{audio?.title}</p>

        <div className="flex flex-row items-center justify-center gap-11">
          <TbRewindBackward15 size={20} onClick={() => skip(-15)} className="cursor-pointer" />
          {isPlaying ? (
            <FaPause size={30} onClick={togglePlay} className="cursor-pointer" />
          ) : (
            <FaPlay size={30} onClick={togglePlay} className="cursor-pointer" />
          )}
          <TbRewindForward15 size={20} onClick={() => skip(15)} className="cursor-pointer" />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Progress
            progress={(currentTime / duration) * 100 || 0}
            className="w-full shrink-0"
            barClassName="[background:linear-gradient(to_right,_#47326B_0%,_#914372_50%,_#AC714F_100%)]"
          />
          <div className="w-full shrink-0 flex flex-row justify-between gap-4 font-medium text-[#e6e7f2] text-[0.75rem]">
            <p>{formatTime(currentTime)}</p>
            <p>{formatTime(duration)}</p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
});

export default Page;
