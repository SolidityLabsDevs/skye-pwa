import Image from 'next/image';
import { FC, memo } from 'react';
import { AudioFull } from 'types/entities';
import cn from 'classnames';
import Link from 'next/link';
import { useUserStore } from 'stores';

type AudioListItemProps = {
  audio: AudioFull;
  className?: string;
};

export const AudioListItem: FC<AudioListItemProps> = memo(({ audio, className }) => {
  const { role } = useUserStore(state => state.user);

  return (
    <Link
      href={`/dashboard/${role?.toLowerCase()}/track/${audio?.id}`}
      className={cn('flex flex-col w-1/2 gap-2', className)}
    >
      <Image
        src={audio?.audioCoverImage?.base64 || audio?.audioCoverImage?.url || ''}
        alt=""
        width={0}
        height={0}
        className="w-full h-auto rounded-[24px]"
      />
      <p className="text-[#e6e7f2] font-thin">{audio?.title}</p>
      <p className="text-[#98a1bd] text-[0.688rem]">45 MIN • 427 hz</p>
    </Link>
  );
});
