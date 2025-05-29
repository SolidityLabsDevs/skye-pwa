import { Button } from 'components/ui/Button';
import { Dialog } from 'components/ui/Dialog';
import cn from 'classnames';
import { FC, memo } from 'react';
import { useModalStore } from 'stores';

type ConfirmProps = {
  confirmAction?: () => void;
  cancelAction?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  title?: string;
  text?: string;
};

export const Confirm: FC<ConfirmProps> = memo(
  ({
    title = 'Confirm action',
    text = 'Message Text',
    confirmButtonText = 'Ok',
    cancelButtonText = 'Cancel',
    confirmAction,
    cancelAction,
  }) => {
    const { activeModal, hide } = useModalStore(state => state);

    return (
      <Dialog visible={activeModal === 'Confirm'} withClose={false} title={title}>
        <div className="text-[1.063rem] mb-4 text-center text-white">{text}</div>
        <div className={cn('flex flex-row justify-between gap-5')}>
          <Button
            onClick={() => {
              confirmAction?.();
              hide?.();
            }}
            className="!w-[45%]"
          >
            {confirmButtonText}
          </Button>
          <Button
            onClick={() => {
              cancelAction?.();
              hide?.();
            }}
            className="!w-[45%]"
          >
            {cancelButtonText}
          </Button>
        </div>
      </Dialog>
    );
  }
);
