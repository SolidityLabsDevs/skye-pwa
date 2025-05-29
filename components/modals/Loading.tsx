import { Dialog } from 'components/ui/Dialog';
import { Spinner } from 'components/ui/Spinner';
import { FC, memo } from 'react';
import { useModalStore } from 'stores';

type LoadingProps = unknown;

export const Loading: FC<LoadingProps> = memo(() => {
  const { activeModal } = useModalStore(state => state);

  return (
    <Dialog
      title="Please wait..."
      className="shine"
      visible={activeModal === 'Loading'}
      withClose={false}
    >
      <Spinner className="mx-auto my-5" size={40} />
    </Dialog>
  );
});
