import { ComponentProps, FC, memo } from 'react';

import { useModalStore } from 'stores';
import { Dialog } from 'components/ui/Dialog';
import { Button } from 'components/ui/Button';

import { RiUser3Line } from 'react-icons/ri';

import Image from 'next/image';

type YourPortalProps = {} & ComponentProps<typeof Dialog>;

export const YourPortal: FC<YourPortalProps> = memo(({ ...props }) => {
  const { activeModal, hide } = useModalStore(state => state);

  return (
    <Dialog
      visible={activeModal === 'YourPortal'}
      dismiss={hide}
      modalType="bottom-sheet"
      closeOutside={false}
      contentClassName="flex flex-col gap-8 items-center"
      {...props}
    >
      <p className="text-[1.25rem]  text-center font-bold">This is your alignment portal</p>
      <div className="flex flex-col items-center gap-6">
        <span className="text-[1.125rem]  text-center block bg-clip-text text-transparent bg-[linear-gradient(to_right,_#FFFFFF_0%,_#504747_100%)]">
          Each night, we’ll track your shift toward who you’re becoming.
        </span>
        <div className="flex flex-col w-full max-w-[316px] mx-auto">
          <div className="bg-[#060202] bg-no-repeat flex flex-col rounded-t-[24px] p-6 min-h-[280px] shrink-0 bg-[url('/images/assets/1.png')] bg-contain bg-right-top">
            <div className="flex flex-row items-center justify-between gap-4">
              <Image height={39} width={67} alt="" src="/images/assets/4.svg" />
              <RiUser3Line size={24} />
            </div>
            <div className="flex flex-col gap-1 mt-auto">
              <p className="text-[0.625rem] font-light">Activity Streak</p>
              <p className="text-[1.563rem] font-medium">0 Days</p>
            </div>
          </div>
          <div className="bg-[#060202] rounded-b-[24px] p-6 flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[0.625rem] font-light">Name</p>
              <p>Zach</p>
            </div>
            <span className="text-[1.5rem] block bg-clip-text text-transparent bg-[linear-gradient(to_right,_#8850a9_0%,_#e9a88f_100%)]">
              --%
            </span>
          </div>
        </div>
      </div>
      <Button theme="outline" pill href="/onboarding">
        Begin Your Shift
      </Button>
    </Dialog>
  );
});
