'use client';
import { Storage } from '@prisma/client';
import cn from 'classnames';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Skeleton } from 'components/ui/Skeleton';
import { API } from 'constants/apiUrls';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { apiError } from 'helpers';

import { RxCross1 } from 'react-icons/rx';
import { StateItem } from './FileInputStorageDrop';
import { IoRefreshOutline } from 'react-icons/io5';
import { useDbStorage } from 'hooks';
import { MdOutlineDelete } from 'react-icons/md';
import { useModalStore } from 'stores';

type FileListItem2Props = {
  item: StateItem;
  removeFile: () => void;
  loadFile: (oldId: string, newId: string) => void;
  errorFile: (id: string) => void;
  bucketName?: string;
  path?: string;
  access?: 'PUBLIC' | 'PRIVATE';
};

export const FileListItem2: FC<FileListItem2Props> = memo(
  ({ item, removeFile, loadFile, errorFile, bucketName = '', path = '', access }) => {
    const [storageFile, setStorageFile] = useState<Storage>();
    const abortControllerRef = useRef<AbortController[]>([]);
    const { show, hide } = useModalStore(state => state);

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
      },
      onError: (err: AxiosError) => {
        item?.id && errorFile(item?.id);
        toast.error(apiError(err, 'File upload error.'));
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
    if (loading) return <Skeleton className="!w-[175px] !h-[107px] !rounded-[8px]" />;

    const finalUrl = storageFile?.base64 || storageFile?.url || '';

    return (
      <div
        className={cn('relative w-[175px] h-[107px] rounded-[8px] bg-cover bg-center', {
          'text-red-500': !!item?.error,
        })}
        style={{ backgroundImage: `url("${finalUrl}")` }}
      >
        <button
          disabled={loading}
          onClick={() => {
            if (item?.error) {
              removeFile();
            } else {
              show('Confirm', {
                title: 'Delete file?',
                text: 'This can not be undone.',
                confirmAction: () =>
                  deleteFile(item.dbId, {
                    onSuccess: () => {
                      removeFile();
                      hide();
                    },
                    onError: err => {
                      toast.error(apiError(err as AxiosError, 'File deletion error.'));
                      hide();
                    },
                  }),
              });
            }
          }}
          className="absolute -top-2 -right-2 bg-[#d9d9d9] text-black rounded-full p-1"
        >
          <MdOutlineDelete size={12} color="black" />
        </button>
        {!item?.error && storageFile && (
          <button
            disabled={loading}
            onClick={() => {
              removeFile();
            }}
            className="absolute top-5 -right-2 bg-[#d9d9d9] text-black rounded-full p-1"
          >
            <RxCross1 size={12} color="black" />
          </button>
        )}

        {item?.error && (
          <button
            disabled={loading}
            onClick={() => {
              uploadFile();
            }}
            className="absolute top-10 -right-2 bg-[#d9d9d9] rounded-full p-1"
          >
            <IoRefreshOutline size={12} />
          </button>
        )}
      </div>
    );
  }
);
