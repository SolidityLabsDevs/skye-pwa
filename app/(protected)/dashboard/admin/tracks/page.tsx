'use client';
import { Audio, Storage } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { API } from 'constants/apiUrls';
import { apiError } from 'helpers';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import loadable from '@loadable/component';
import { DashboardLink } from 'components/lib/dashboard/DashboardLink';
import { Button } from 'components/ui/Button';
import { Card } from 'components/ui/Card';
import { ListEmpty } from 'components/ui/ListEmpty';
import { Spinner } from 'components/ui/Spinner';

import { IoMdRefreshCircle, IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import { getUniqueListBy } from 'utils';
import { Input } from 'components/formElements/Input';
import { useDebounce } from 'hooks';

type PageProps = unknown;

const DEFAULTS = {
  title: 'New audio',
  audioCoverImageId: null,
  audioFileId: null,
};

const limit = 10;

const Page: FC<PageProps> = memo(() => {
  const [active, setActive] = useState<Audio>();

  const [params, setParams] = useState({ search: '', limit, offset: 0 });
  const paramsDebounced = useDebounce(params);

  const [count, setCount] = useState(0);
  const [list, setList] = useState<Array<Audio & { audioCoverImage: Storage; audioFile: Storage }>>(
    []
  );

  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(count / params.limit) || 1;

  const refresh = () => {
    setList([]);
    setPage(1);
    setActive(undefined);
    setParams({ limit, offset: 0, search: '' });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios(API.ADMIN.TRACKS.INDEX, {
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

  const { mutate: deleteAudio, isPending: deleteLoading } = useMutation({
    mutationFn: (id: string) =>
      axios.delete(API.ADMIN.TRACKS.INDEX, {
        params: {
          id,
        },
      }),
    onSuccess: () => {
      const _list = [...list];
      const findIndex = _list.findIndex(item => item?.id === active?.id);
      if (findIndex !== -1) {
        _list.splice(findIndex, 1);
        setList(_list);
      }
    },

    onError: (err: AxiosError) => {
      toast.error(apiError(err));
    },
  });

  const { mutate: addAudio, isPending: addAudioPending } = useMutation({
    mutationFn: (payload: Partial<Audio>) => axios.post(API.ADMIN.TRACKS.INDEX, payload),
    onError: (err: AxiosError) => {
      toast.error(apiError(err));
    },
    onSuccess: res => {
      refresh();
      setActive(res.data);
      toast.success(`Audio created`);
    },
  });

  const loading = deleteLoading || isPending || addAudioPending;

  const AudioFormMemo = useMemo(() => {
    const find = list?.find(item => item?.id === active?.id);

    if (!find) return <ListEmpty text="Select an audio or add new" className="shrink-0" />;

    const TrackForm = loadable(() => import('components/forms').then(mod => mod.TrackForm));
    return <TrackForm dismiss={refresh} active={find} />;
  }, [active?.id, list]);

  const toggleActive = (hrefOrLabel: string) => {
    const find = list.find(item => item?.id === hrefOrLabel || item?.title === hrefOrLabel);
    setActive(find);
  };

  useEffect(() => {
    mutate();
  }, [paramsDebounced]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap gap-4">
        <Button loading={loading} onClick={refresh} icon={<IoMdRefreshCircle />}>
          Refresh
        </Button>
        <Button
          loading={loading}
          onClick={() =>
            addAudio({
              ...DEFAULTS,
            })
          }
          icon={<IoMdAdd />}
        >
          Add audio
        </Button>
        {active && (
          <Button
            icon={<MdDeleteOutline />}
            loading={loading}
            onClick={() => deleteAudio(active?.id)}
          >
            Delete "{active.title}"
          </Button>
        )}
      </div>
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <Card className="lg:max-w-[300px] w-full shrink-0">
          <Input
            placeholder="Search"
            type="search"
            wrpClassName="mb-6"
            value={params?.search}
            onChange={e => {
              setList([]);
              setParams(prev => ({ ...prev, limit, offset: 0, search: e.target.value }));
            }}
          />
          <div className="flex flex-row items-start lg:flex-col">
            {list.map((component, idx) => {
              return (
                <DashboardLink
                  className="shrink-0"
                  link={{
                    disabled: loading,
                    label: component?.title?.trim() || 'New audio',
                  }}
                  key={`${idx}-${component?.id}-${component?.title}`}
                  onClick={() => {
                    toggleActive(component?.title || component?.id);
                  }}
                />
              );
            })}
          </div>
          {loading && !list?.length && <Spinner />}
          {page < pageCount && (
            <div className="flex flex-row flex-wrap items-center gap-2 mt-6">
              <Button
                loading={loading}
                onClick={() => {
                  if (page < pageCount) {
                    setPage(page => page + 1);
                    setParams(prev => ({ ...prev, offset: prev.offset + prev.limit }));
                  }
                }}
                theme="outline"
              >
                Load more
              </Button>
              <p className="text-[0.875rem] text-default">
                {list?.length} of {count}
              </p>
            </div>
          )}
        </Card>
        <>{loading && <Spinner />}</>
        <>{!loading && AudioFormMemo}</>
      </div>
    </div>
  );
});

export default Page;
