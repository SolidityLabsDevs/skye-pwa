import { ComponentProps, FC, memo, ReactElement } from 'react';

import { useModalStore } from 'stores';
import { Dialog } from 'components/ui/Dialog';
import { ListItem } from 'components/ui/ListItem';

import { MdOpenInNew } from 'react-icons/md';

type ViewFileProps = {
  type?: string;
  src?: string;
  children?: ReactElement;
} & ComponentProps<typeof Dialog>;

export const ViewFile: FC<ViewFileProps> = memo(({ type, src, children, ...props }) => {
  const { activeModal, hide } = useModalStore(state => state);

  return (
    <Dialog visible={activeModal === 'ViewFile'} dismiss={hide} modalType="bottom-sheet" {...props}>
      {type?.includes('video') && <video src={src} controls className="w-full h-full" />}
      {type?.includes('image') && (
        <div
          style={{ backgroundImage: `url('${src}')` }}
          className="!w-full !h-full min-w-[200px] min-h-[200px] bg-center bg-no-repeat bg-contain"
        />
      )}
      <div className="h-2" />
      {src && (
        <ListItem
          icon={<MdOpenInNew />}
          value={'Open in new tab'}
          onClick={() => {
            const link = document.createElement('a');
            link.target = '_blank';
            link.href = src;
            link.click();
            document.removeChild(link);
          }}
        />
      )}
      {children}
    </Dialog>
  );
});
