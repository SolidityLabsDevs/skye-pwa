'use client';
import { FC, memo, ReactNode, useState, useEffect, ReactElement } from 'react';
import { default as Dropzone } from 'react-dropzone';
import cn from 'classnames';
import { humanFileSize } from 'utils';
import { nanoid } from 'nanoid';
import { CardStack } from 'components/ui/CardStack';
import { ListItem } from 'components/ui/ListItem';
import { RequiredStar } from 'components/ui/RequiredStar';
import { Skeleton } from 'components/ui/Skeleton';
import { format } from 'date-fns';

import { AiOutlineFileSearch } from 'react-icons/ai';
import { FiUploadCloud } from 'react-icons/fi';

import { MyFilesList } from 'components/lib';
import { useUserStore } from 'stores';

export type StateItem = {
  id: string;
  dbId: string;
  url?: string | null;
  base64?: string | null;
  file: File;
  loaded: boolean;
  error: boolean;
};
export type State = StateItem[];

type RenderProp = (props: {
  state: State;
  removeFile: (id: string) => void;
  loadFile: (oldId: string, newId: string) => void;
  errorFile: (id: string) => void;
}) => ReactNode;

type FileInputStorageDropProps = {
  label?: string;
  className?: string;
  contentClassName?: string;
  cardContentClassName?: string;
  multiple?: boolean;
  maxSizeBytes?: number;
  maxFiles?: number;
  accept: Array<Partial<keyof typeof ACCEPT>>;
  children: RenderProp;
  initial?: State;
  loading?: boolean;
  error?: boolean;
  required?: boolean;
  showIcon?: boolean;
  customDrop?: ReactElement;
  setMyFileSelectedValue?: (fileId: string) => void;
};

const ACCEPT = {
  'audio/*': ['.mp3', '.ogg', '.wav'],
  'video/*': ['.mp4', '.avi', '.mov', '.webm', '.mkv'],
  'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
  'text/csv': ['.csv'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

export const FileInputStorageDrop: FC<FileInputStorageDropProps> = memo(
  ({
    label,
    className,
    contentClassName,
    cardContentClassName,
    multiple = false,
    maxSizeBytes = 1_000_000,
    maxFiles = 5,
    accept = ['image/*'],
    children,
    initial,
    loading,
    error,
    required,
    setMyFileSelectedValue,
    customDrop,
    showIcon = true,
  }) => {
    const userId = useUserStore(state => state.user.id);
    const [state, setState] = useState<State>([]);

    const onDrop = (fileList: File[]) => {
      if (!fileList) return;
      setState(prev => [
        ...prev,
        ...Array.from(fileList).map(f => ({
          id: `${format(new Date(), 'yyyyMMdd_HHmmss')}-${nanoid()}`,
          file: f,
          dbId: '',
          loaded: false,
          error: false,
        })),
      ]);
    };

    const loadFile = (oldId: string, newId: string) => {
      const _state = [...state];
      const findIdx = _state.findIndex(f => f.id === oldId);
      _state[findIdx].dbId = newId;
      _state[findIdx].loaded = true;
      _state[findIdx].error = false;
      setState(_state);
    };

    const errorFile = (id: string) => {
      const _state = [...state];
      const findIdx = _state.findIndex(f => f.id === id);
      _state[findIdx].loaded = false;
      _state[findIdx].error = true;
      setState(_state);
    };

    const removeFile = (id: string) => {
      const _state = [...state];
      const findIdx = _state.findIndex(f => f.id === id);
      _state.splice(findIdx, 1);
      setState(_state);
    };

    const acceptReduced = accept.reduce((prev, cur) => {
      if (ACCEPT?.[cur as keyof typeof ACCEPT]) {
        prev[cur] = ACCEPT?.[cur as keyof typeof ACCEPT];
      }
      return prev;
    }, {} as any);

    const formatsReduced: string = Object.values(acceptReduced).length
      ? (Object.values(acceptReduced).reduce((prev, cur) => {
          return [prev, (cur as string[]).join(', ')].filter(Boolean).join(', ');
        }, '') as string)
      : '';

    useEffect(() => {
      !!initial?.length && setState(initial);
    }, [initial]);

    const _maxFiles = multiple ? maxFiles : 1;

    const [activeIdx, setActiveIdx] = useState(0);

    const classes = cn(
      '!p-1',
      { '!p-0 !border-0 !border-none !rounded-0 hidden': state.length === _maxFiles },
      cardContentClassName
    );

    return (
      <div className={cn('w-full max-w-[350px]', className)}>
        {label && (
          <p className="w-full text-left text-defaultText">
            {label} <RequiredStar visible={required} />{' '}
          </p>
        )}
        <CardStack
          activeIdx={activeIdx}
          setActiveIdx={setActiveIdx}
          className={classes}
          items={[
            {
              contentClassName: classes,
              children: (
                <>
                  {state.length !== _maxFiles && (
                    <>
                      <Dropzone
                        onDrop={onDrop}
                        multiple={multiple}
                        accept={acceptReduced}
                        maxSize={maxSizeBytes}
                        maxFiles={_maxFiles}
                        disabled={loading}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps()}
                            className={cn(
                              'w-full flex flex-col items-center bg-onNeutralBg justify-center py-4 px-6 rounded-[8px] border-[1px] border-default border-solid cursor-pointer hover:opacity-70',
                              {
                                hidden: state.length === _maxFiles,
                                'border-red-500': error,
                              },
                              contentClassName
                            )}
                          >
                            <input {...getInputProps()} disabled={false} />
                            {loading && (
                              <>
                                <Skeleton className="mb-1 h-[0.875rem]" />
                                <Skeleton className="h-[0.75rem]" />
                              </>
                            )}
                            {!loading && !customDrop && (
                              <>
                                {showIcon && (
                                  <div className="p-[12px] rounded-full bg-primaryForeground boder-solid border-default border-[8px]">
                                    <FiUploadCloud size={24} color="" className="text-primary" />
                                  </div>
                                )}
                                <label className="mb-1 text-center text-primary text-[0.875rem]">
                                  <span className="font-semibold ">Click to upload</span> or drag
                                  and drop
                                </label>
                                <label className="text-defaultText text-center text-[0.75rem]">
                                  {formatsReduced} ({humanFileSize(maxSizeBytes)} max. file size)
                                  max. {_maxFiles} files
                                </label>
                              </>
                            )}
                            {!loading && customDrop}
                          </div>
                        )}
                      </Dropzone>
                      {!loading && userId && (
                        <ListItem
                          icon={<AiOutlineFileSearch />}
                          withArrow
                          value="Choose from my files"
                          withBg
                          onClick={() => setActiveIdx(1)}
                          wrpClassName="my-2"
                        />
                      )}
                    </>
                  )}
                </>
              ),
            },
            {
              contentClassName: classes,
              children: state.length !== _maxFiles && (
                <MyFilesList
                  onSelect={(stateItem: StateItem) => {
                    setState(prev => [...prev, stateItem]);
                    setActiveIdx(0);
                    setMyFileSelectedValue?.(stateItem.dbId);
                  }}
                />
              ),
            },
          ]}
        />
        {!loading && activeIdx === 0 && children?.({ state, removeFile, loadFile, errorFile })}
      </div>
    );
  }
);
