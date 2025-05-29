'use client';
import cn from 'classnames';
import { FC, memo, useState, useEffect } from 'react';
import RenderIfVisible from 'react-render-if-visible';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

import { Storage } from '@prisma/client';
import { API } from 'constants/apiUrls';
import { getUniqueListBy, humanFileSize, truncate } from 'utils';
import { apiError } from 'helpers';
import { ListEmpty } from 'components/ui/ListEmpty';
import { ListItem } from 'components/ui/ListItem';
import { Skeleton } from 'components/ui/Skeleton';
import { Spinner } from 'components/ui/Spinner';
import { useAsync, useDbStorage } from 'hooks';
import { customScrollbar } from 'constants/classNames';
import { StateItem } from 'components/formElements';
import { useModalStore } from 'stores';

import { IoMdAdd } from 'react-icons/io';
import { MdOutlineDelete } from 'react-icons/md';
import { Avatar } from 'components/ui/Avatar';

type MyFilesListProps = {
  onSelect: (stateItem: StateItem) => void;
};

const Item = ({
  onSelect,
  itemId,
  refetch,
}: MyFilesListProps & { itemId: string; refetch: () => void }) => {
  const { show, hide } = useModalStore(state => state);
  const [item, setItem] = useState<StateItem>();

  const { getStateItemFile, useDeleteFileMutation } = useDbStorage({});
  const { mutate: deleteFile, isPending: deleteFilePending } = useDeleteFileMutation();

  const { loading } = useAsync(async () => {
    const _item = await getStateItemFile(itemId);
    _item && setItem(_item);
  }, []);

  if (deleteFilePending || loading) return <Skeleton />;

  const DeleteFileElement = () => {
    if (!item) return null;

    return (
      <ListItem
        loading={deleteFilePending || loading}
        disabled={deleteFilePending || loading}
        className="text-red-500"
        value={'Delete file'}
        onClick={() => {
          deleteFile(item?.dbId, {
            onSuccess: () => {
              refetch();
              hide();
            },
            onError: err => {
              toast.error(apiError(err as AxiosError, 'File deletion error.'));
            },
          });
        }}
        icon={<MdOutlineDelete className="text-red-500" />}
      />
    );
  };

  const ChooseFileElement = () => {
    return (
      <ListItem
        disabled={loading}
        value="Use this file"
        onClick={() => {
          item && onSelect(item);
          hide();
        }}
        icon={<IoMdAdd />}
      />
    );
  };

  return item ? (
    <ListItem
      wrpClassName={cn('!w-full max-w-[350px]')}
      value={`${truncate(item?.file?.name || '')} (${humanFileSize(item?.file?.size || item?.file?.size || 0)})`}
      withArrow
      withBg
      icon={
        ['image', 'video'].some(v => item?.file?.type?.includes(v)) ? (
          <Avatar src={item?.url || item?.base64 || ''} size={80} />
        ) : (
          <code>{(item?.file?.name || '').split('.').pop()}</code>
        )
      }
      onClick={() => {
        show('ViewFile', {
          src: item?.url || item?.base64 || '',
          type: item?.file?.type,
          children: (
            <>
              <ChooseFileElement />
              <DeleteFileElement />
            </>
          ),
        });
      }}
    />
  ) : null;
};

export const MyFilesList: FC<MyFilesListProps> = memo(({ onSelect }) => {
  const [params, setParams] = useState({
    limit: 5,
    offset: 0,
  });
  const [count, setCount] = useState(0);
  const [list, setList] = useState<Array<Storage>>([]);

  const { ref, inView } = useInView();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios(API.STORAGE.MY, {
        params,
      }),
    onSuccess: res => {
      setCount(res.data.count);
      setList(prev => getUniqueListBy([...prev, ...res.data.list], 'id'));
    },
    onError: (err: AxiosError) => {
      toast.error(apiError(err));
    },
  });

  useEffect(() => {
    mutate();
  }, [params]);

  useEffect(() => {
    if (!isPending && list.length !== count && inView) {
      setParams(prev => ({ ...prev, offset: prev.offset + prev.limit }));
    }
  }, [inView, list.length, count, isPending]);

  return (
    <div className={cn('!max-h-[300px] overflow-y-auto', customScrollbar)}>
      {isPending && !list.length && <Spinner className="mx-auto my-5" />}
      {!isPending && !list.length && count === 0 && <ListEmpty />}
      <div className="flex flex-col gap-2">
        {!!list.length &&
          list.map((item, idx) => {
            const element = (
              <Item
                refetch={() => {
                  setParams(() => ({ limit: 5, offset: 0 }));
                  setCount(0);
                  setList([]);
                  mutate();
                }}
                itemId={item.id}
                key={item.id}
                onSelect={onSelect}
              />
            );

            if (idx === list?.length - 1) {
              return (
                <RenderIfVisible key={item.id} defaultHeight={250} stayRendered visibleOffset={250}>
                  <div ref={ref}>{element}</div>
                </RenderIfVisible>
              );
            }

            return (
              <RenderIfVisible key={item.id} defaultHeight={250} stayRendered visibleOffset={0}>
                {element}
              </RenderIfVisible>
            );
          })}
      </div>
    </div>
  );
});
