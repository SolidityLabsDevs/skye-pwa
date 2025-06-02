'use client';
import { FC, memo, useEffect, useState } from 'react';
import axios from 'axios';
import RenderIfVisible from 'react-render-if-visible';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';

import { useMutation } from '@tanstack/react-query';
import { API } from 'constants/apiUrls';
import { getUniqueListBy } from 'utils';
import { ListEmpty } from 'components/ui/ListEmpty';
import { Spinner } from 'components/ui/Spinner';
import { AudioListItem } from './AudioListItem';
import { AudioFull } from 'types/entities';

type AudioListProps = unknown;

const AudioListComponent: FC<AudioListProps> = memo(() => {
  const [params, setParams] = useState({
    limit: 20,
    offset: 0,
  });
  const [count, setCount] = useState(0);
  const [list, setList] = useState<Array<AudioFull>>([]);

  const { ref, inView } = useInView();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios(API.USER.AUDIO.INDEX, {
        params,
      }),
    onSuccess: res => {
      setCount(res.data.count);
      setList(prev => getUniqueListBy([...prev, ...res.data.list], 'slug'));
    },
    onError: () => {
      toast.error('An error occured');
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
    <div>
      {isPending && !list.length && <Spinner className="mx-auto my-5" />}
      {!isPending && !list.length && count === 0 && <ListEmpty />}
      <div className="flex flex-row items-stretch justify-between gap-5">
        {!!list.length &&
          list.map((item, idx) => {
            const element = <AudioListItem audio={item} key={item?.id} />;

            if (idx === list?.length - 1) {
              return (
                <RenderIfVisible
                  key={item.id}
                  defaultHeight={250}
                  stayRendered
                  visibleOffset={250}
                  rootElementClass="w-full shrink-0 max-w-[300px]"
                >
                  <div ref={ref}>{element}</div>
                </RenderIfVisible>
              );
            }

            return (
              <RenderIfVisible
                rootElementClass="w-full shrink-0 max-w-[300px]"
                key={item.id}
                defaultHeight={250}
                stayRendered
                visibleOffset={0}
              >
                {element}
              </RenderIfVisible>
            );
          })}
      </div>
    </div>
  );
});

export const AudioList = dynamic(() => Promise.resolve(AudioListComponent), {
  ssr: false,
});
