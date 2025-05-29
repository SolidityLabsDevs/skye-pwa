'use client';
import { memo, FC } from 'react';

import { truncate } from 'utils';

import { AiOutlineFile } from 'react-icons/ai';

type AssetFileProps = {
  file: File;
};

export const AssetFile: FC<AssetFileProps> = memo(({ file }) => {
  return (
    <div className="p-[16px] shrink-0 bg-onNeutralBg rounded-[8px] border-[1px] border-solid border-primary h-[96px] flex flex-row items-start max-w-[280px] gap-[15px]">
      <div className="p-[12px] rounded-full bg-[#f4ebff] boder-solid border-default border-[8px]">
        <AiOutlineFile size={16} className="text-primary" />
      </div>
      <div className="flex flex-col gap-2 text-[0.875rem]">
        <p className="font-medium text-defaultText">{truncate(file.name, 25)}</p>
        <p className=" text-defaultText"> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
    </div>
  );
});
