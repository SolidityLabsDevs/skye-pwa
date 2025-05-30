import { FC, memo } from 'react';

import { PiPlayThin } from 'react-icons/pi';

type TrackProps = unknown;

export const Track: FC<TrackProps> = memo(() => {
  return (
    <div className="flex flex-row items-center justify-between w-full gap-4">
      <div className="flex flex-col">
        <p className="text-[#a1a4b2] font-thin italic">Tonights Reprograming</p>
        <div>
          <p className="font-light text-[1.563rem]">001 Jesse's Intro</p>
          <p className="text-[#a1a4b2] font-thin italic text-right">427htz - 60 min</p>
        </div>
      </div>
      <button className="rounded-full border- border-solid border-[#a1a4b2] flex items-center justify-center w-14 h-14">
        <PiPlayThin size={20} color="#a1a4b2" />
      </button>
    </div>
  );
});
