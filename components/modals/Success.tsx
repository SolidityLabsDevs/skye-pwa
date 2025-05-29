import { Button } from 'components/ui/Button';
import { Dialog } from 'components/ui/Dialog';
import cn from 'classnames';
import { FC, memo } from 'react';
import { useModalStore } from 'stores';

type SuccessProps = {
  action?: () => void;
  buttonText?: string;
  title?: string;
  text?: string;
};

export const Success: FC<SuccessProps> = memo(
  ({ title = 'Success', text = 'Message Text', buttonText = 'Close', action }) => {
    const { activeModal, hide } = useModalStore(state => state);

    return (
      <Dialog
        className="border-t-4 border-green-500"
        visible={activeModal === 'Success'}
        withClose={false}
        title={title}
      >
        <div className="text-[1.063rem] mb-4 text-defaultText text-center">{text}</div>
        <div className={cn('flex flex-row w-full justify-center gap-5')}>
          <Button
            onClick={() => {
              action?.();
              hide?.();
            }}
          >
            {buttonText}
          </Button>
        </div>
      </Dialog>
    );
  }
);
