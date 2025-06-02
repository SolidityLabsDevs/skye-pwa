'use client';
import { FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/ui/Button';
import { FileInputStorageDrop } from 'components/formElements/FileInputStorageDrop';
import { FileListItem2 } from 'components/formElements/FileListItem2';
import { Input } from 'components/formElements/Input';
import { FileListItem } from 'components/formElements/FileListItem';
import { StateItem } from 'components/formElements';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { API } from 'constants/apiUrls';
import { toast } from 'react-toastify';
import { apiError } from 'helpers';
import { useDbStorage } from 'hooks';
import { Audio } from '@prisma/client';
import {
  postTrackSchema,
  TPatchTrackSchema,
  TPostTrackSchema,
} from 'app/api/admin/tracks/validators';

type TrackFormProps = {
  dismiss?: () => void;
  active?: Audio;
};

export const TrackForm: FC<TrackFormProps> = memo(({ dismiss, active }) => {
  type Fields = typeof active extends Audio ? TPatchTrackSchema : TPostTrackSchema;

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    unregister,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      title: active?.title || '',
      audioCoverImageId: active?.audioCoverImageId || '',
      audioFileId: active?.audioFileId || '',
      ...(active ? { id: active?.id } : {}),
    } as any,
    resolver: zodResolver(postTrackSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => axios[active ? 'patch' : 'post'](API.ADMIN.TRACKS.INDEX, getValues()),
    onError: (err: AxiosError) => {
      toast.error(apiError(err));
    },
    onSuccess: () => {
      toast.success(`Audio ${active ? 'updated' : 'created'}`);
      reset();
      dismiss?.();
    },
  });

  const { loading, state } = useDbStorage({
    fileIds: !!getValues('audioCoverImageId') ? [getValues('audioCoverImageId') as string] : [],
    setFileIds(fileIds) {
      setValue('audioCoverImageId', fileIds[0]);
    },
  });

  const { loading: audioFileLoading, state: audioFileState } = useDbStorage({
    fileIds: !!getValues('audioFileId') ? [getValues('audioFileId') as string] : [],
    setFileIds(fileIds) {
      setValue('audioFileId', fileIds[0]);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <Button
          onClick={handleSubmit(() => {
            mutate();
          }, console.log)}
          loading={isPending}
        >
          Submit
        </Button>
        <Button onClick={dismiss} loading={isPending} theme="glass">
          Cancel
        </Button>
      </div>
      <Input error={errors?.title?.message} required placeholder="Title" {...register('title')} />
      <div className="!z-50 w-full">
        <FileInputStorageDrop
          label="Cover Image"
          error={!!errors?.audioCoverImageId?.message}
          accept={['image/*']}
          maxFiles={1}
          initial={state}
          loading={loading}
          maxSizeBytes={4_000_000}
          setMyFileSelectedValue={fileId => setValue(`audioCoverImageId`, fileId)}
        >
          {({ state, removeFile, loadFile, errorFile }) => {
            return (
              <div className="w-full">
                {state.map((item, idx) => (
                  <div
                    key={item.id}
                    className="relative"
                    style={{ zIndex: 100 * (state.length - idx) }}
                  >
                    <FileListItem2
                      loadFile={(id, respId) => {
                        loadFile(id, respId);
                        setValue(`audioCoverImageId`, respId);
                      }}
                      errorFile={errorFile}
                      item={item as StateItem}
                      removeFile={() => {
                        (item as StateItem)?.id && removeFile((item as StateItem)?.id);
                        unregister(`audioCoverImageId`);
                      }}
                    />
                  </div>
                ))}
              </div>
            );
          }}
        </FileInputStorageDrop>
      </div>
      <div className="!z-50 w-full">
        <FileInputStorageDrop
          label="Audio File"
          error={!!errors?.audioFileId?.message}
          accept={['audio/*']}
          maxFiles={1}
          maxSizeBytes={4_000_000}
          initial={audioFileState}
          loading={audioFileLoading}
          setMyFileSelectedValue={fileId => setValue(`audioFileId`, fileId)}
        >
          {({ state, removeFile, loadFile, errorFile }) => {
            return (
              <div className="w-full">
                {state.map((item, idx) => (
                  <div
                    key={item.id}
                    className="relative"
                    style={{ zIndex: 100 * (state.length - idx) }}
                  >
                    <FileListItem
                      loadFile={(id, respId) => {
                        loadFile(id, respId);
                        setValue(`audioFileId`, respId);
                      }}
                      errorFile={errorFile}
                      item={item as StateItem}
                      removeFile={() => {
                        (item as StateItem)?.id && removeFile((item as StateItem)?.id);
                        unregister(`audioFileId`);
                      }}
                    />
                  </div>
                ))}
              </div>
            );
          }}
        </FileInputStorageDrop>
      </div>
      <Button
        onClick={handleSubmit(() => {
          mutate();
        }, console.log)}
        loading={isPending}
        className="mt-4"
      >
        Submit
      </Button>
    </div>
  );
});
