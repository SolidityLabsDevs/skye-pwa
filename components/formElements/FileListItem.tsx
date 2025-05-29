'use client';
import { Storage } from '@prisma/client';
import cn from 'classnames';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListItem } from 'components/ui/ListItem';
import { Skeleton } from 'components/ui/Skeleton';
import { API } from 'constants/apiUrls';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { humanFileSize, truncate } from 'utils';
import { toast } from 'react-toastify';
import { apiError } from 'helpers';

import { GiMagicBroom } from 'react-icons/gi';
import { MdOutlineDelete, MdErrorOutline } from 'react-icons/md';
import { StateItem } from './FileInputStorageDrop';
import { IoRefreshOutline } from 'react-icons/io5';
import { useDbStorage } from 'hooks';
import { useModalStore } from 'stores';

type FileListItemProps = {
  item: StateItem;
  removeFile: () => void;
  loadFile: (oldId: string, newId: string) => void;
  errorFile: (id: string) => void;
  bucketName?: string;
  path?: string;
  access?: 'PUBLIC' | 'PRIVATE';
};

export const FileListItem: FC<FileListItemProps> = memo(
  ({ item, removeFile, loadFile, errorFile, bucketName = '', path = '', access }) => {
    const { show, hide } = useModalStore(state => state);
    const [storageFile, setStorageFile] = useState<Storage>();
    const abortControllerRef = useRef<AbortController[]>([]);

    const {
      mutate: uploadFile,
      isPending: uploadFilePending,
      isSuccess: uploadFileSuccess,
      isError: uploadFileError,
    } = useMutation({
      mutationFn: () => {
        abortControllerRef.current.forEach(ctrl => ctrl.abort());
        abortControllerRef.current = [];
        abortControllerRef.current.push(new AbortController());

        const fd = new FormData();
        item && fd.append('file', item.file);
        item && fd.append('id', item?.id);
        access && fd.append('access', access);
        fd.append('bucketName', bucketName);
        fd.append('path', path);

        return axios.post(API.STORAGE.INDEX, fd, {
          signal: abortControllerRef.current?.[0]?.signal,
        });
      },
      onSuccess: res => {
        if (item?.id && res.data.id) {
          loadFile(item?.id, res.data.id);
          setStorageFile(res.data);
        }
        hide();
      },
      onError: (err: AxiosError) => {
        item?.id && errorFile(item?.id);
        toast.error(apiError(err, 'File upload error.'));
        hide();
      },
    });

    const { useGetFileMutation, useDeleteFileMutation } = useDbStorage({});
    const { mutate: deleteFile, isPending: deleteFilePending } = useDeleteFileMutation();
    const { mutate: getFile, isPending: getFilePending } = useGetFileMutation();

    useEffect(() => {
      if (
        !item?.dbId ||
        storageFile ||
        getFilePending ||
        uploadFilePending ||
        uploadFileSuccess ||
        uploadFileError
      )
        return;
      getFile(item?.dbId, {
        onSuccess: res => {
          setStorageFile(res?.data);
        },
        onError: err => {
          item?.id && errorFile(item?.id);
          toast.error(apiError(err as AxiosError, 'Fetch file error.'));
        },
      });
    }, [
      item?.dbId,
      storageFile,
      getFilePending,
      uploadFileSuccess,
      uploadFileError,
      uploadFilePending,
      item?.loaded,
    ]);

    useEffect(() => {
      if (uploadFilePending || uploadFileSuccess || uploadFileError || !!item?.loaded) {
        return;
      }
      abortControllerRef.current.forEach(ctrl => ctrl.abort());
      uploadFile();
    }, [uploadFileSuccess, uploadFileError, item, uploadFilePending, abortControllerRef.current]);

    useEffect(() => {
      return () => {
        abortControllerRef.current.forEach(ctrl => ctrl.abort());
      };
    }, []);

    const loading = deleteFilePending || uploadFilePending;
    if (loading) return <Skeleton className="w-full h-10 my-1" />;

    const finalUrl = storageFile?.base64 || storageFile?.url || '';

    const RemoveFileElement = () => {
      return (
        <>
          {!item?.error && storageFile && (
            <ListItem
              disabled={loading}
              value="Remove file"
              onClick={() => {
                removeFile();
                hide();
              }}
              icon={<GiMagicBroom />}
            />
          )}
        </>
      );
    };

    const DeleteFileElement = () => {
      return (
        <ListItem
          disabled={loading}
          className="text-red-500"
          value={item?.error ? 'Remove file' : 'Delete file'}
          onClick={() => {
            if (item?.error) {
              removeFile();
            } else {
              deleteFile(item.dbId, {
                onSuccess: () => {
                  removeFile();
                },
                onError: err => {
                  toast.error(apiError(err as AxiosError, 'File deletion error.'));
                },
              });
            }
            hide();
          }}
          icon={item?.error ? <GiMagicBroom /> : <MdOutlineDelete className="text-red-500" />}
        />
      );
    };

    return (
      <ListItem
        wrpClassName="!w-full max-w-[350px]"
        className={cn('!w-full max-w-[350px]', {
          'text-red-500': !!item?.error,
        })}
        value={`${truncate(item?.file?.name || storageFile?.name || '')} (${humanFileSize(item?.file?.size || storageFile?.size || 0)})`}
        withArrow
        icon={
          item?.error ? (
            <MdErrorOutline
              className={cn('text-defaultText', {
                'text-red-500': !!item?.error,
              })}
            />
          ) : (
            <code>{(item?.file?.name || storageFile?.name || '').split('.').pop()}</code>
          )
        }
        onClick={() => {
          show('ViewFile', {
            type: storageFile?.type || undefined,
            src: finalUrl,
            children: (
              <>
                {item?.error && (
                  <ListItem
                    value="Retry"
                    onClick={() => {
                      uploadFile();
                    }}
                    disabled={loading}
                    icon={<IoRefreshOutline />}
                  />
                )}
                <RemoveFileElement />
                <DeleteFileElement />
              </>
            ),
          });
        }}
      />
    );
  }
);
