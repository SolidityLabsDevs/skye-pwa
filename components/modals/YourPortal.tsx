import { ComponentProps, FC, memo } from 'react';

import { useModalStore } from 'stores';
import { Dialog } from 'components/ui/Dialog';
import { Button } from 'components/ui/Button';

import { ProfileCard } from 'components/local/ProfileCard';

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
        <ProfileCard />
      </div>
      <Button theme="outline" pill href="/onboarding">
        Begin Your Shift
      </Button>
    </Dialog>
  );
});
