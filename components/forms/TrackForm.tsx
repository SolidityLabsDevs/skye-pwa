'use client';
import { FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/ui/Button';
import { FileInputStorageDrop } from 'components/formElements/FileInputStorageDrop';
import { FileListItem2 } from 'components/formElements/FileListItem2';
import { Input } from 'components/formElements/Input';
import { FileListItem } from 'components/formElements/FileListItem';
import { Option, Select, StateItem } from 'components/formElements';
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
import Editor from 'react-simple-wysiwyg';
import { Accordion } from 'components/ui';
import { QUESTIONS } from 'constants/questions';

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
    watch,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      title: active?.title || '',
      audioCoverImageId: active?.audioCoverImageId || '',
      audioFileId: active?.audioFileId || '',

      about_your_script: active?.about_your_script || '',
      how_it_works: active?.how_it_works || '',
      what_you_will_feel: active?.what_you_will_feel || '',
      how_to_listen_for_maximum_effect: active?.how_to_listen_for_maximum_effect || '',

      show_for_answers_question_1: active?.show_for_answers_question_1 || [],
      show_for_answers_question_2: active?.show_for_answers_question_2 || [],
      show_for_answers_question_3: active?.show_for_answers_question_3 || [],
      show_for_answers_question_4: active?.show_for_answers_question_4 || [],
      show_for_answers_question_5: active?.show_for_answers_question_5 || [],
      show_for_answers_question_6: active?.show_for_answers_question_6 || [],
      show_for_answers_question_7: active?.show_for_answers_question_7 || [],
      show_for_answers_question_8: active?.show_for_answers_question_8 || [],
      show_for_answers_question_9: active?.show_for_answers_question_9 || [],
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
    <div className="flex flex-col gap-3">
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

      <Input
        label={'Audio Title'}
        error={errors?.title?.message}
        required
        placeholder="Title"
        {...register('title')}
      />
      <Accordion title="Audio overview texts" contentClassName="flex flex-col gap-3">
        <div className="!prose">
          <label className="text-white">"About your script" text</label>
          <Editor
            placeholder='"About your script" text'
            value={watch('about_your_script') || ''}
            onChange={e => setValue('about_your_script', e.target.value)}
            className="text-white"
          />
        </div>

        <div className="!prose">
          <label className="text-white">"How It Works" text</label>
          <Editor
            placeholder='"How It Works" text'
            value={watch('how_it_works') || ''}
            onChange={e => setValue('how_it_works', e.target.value)}
            className="text-white"
          />
        </div>

        <div className="!prose">
          <label className="text-white">"What you will feel after listening" text</label>
          <Editor
            placeholder='"What you will feel after listening" text'
            value={watch('what_you_will_feel') || ''}
            onChange={e => setValue('what_you_will_feel', e.target.value)}
            className="text-white"
          />
        </div>

        <div className="!prose">
          <label className="text-white">"How to listen for maximum effect" text</label>
          <Editor
            placeholder='"How to listen for maximum effect" text'
            value={watch('how_to_listen_for_maximum_effect') || ''}
            onChange={e => setValue('how_to_listen_for_maximum_effect', e.target.value)}
            className="text-white"
          />
        </div>
      </Accordion>

      <Accordion contentClassName="flex flex-col gap-3" title="Show for onboarding answers">
        {QUESTIONS.filter(q => q.id !== 'q-3')?.map(q => {
          const key = `show_for_answers_${q.db_prop}` as any;

          return (
            <Select
              key={q.id}
              label={`${q.title}: ${q.text}`}
              isMulti
              options={q.answers.map(a => ({ label: a.text, value: a.id }))}
              value={q.answers
                .filter(a => (watch(key) || []).includes(a.id))
                .map(a => ({ label: a.text, value: a.id }))}
              onChange={opt =>
                setValue(
                  key,
                  (opt as any)?.map((o: Option) => o.value)
                )
              }
            />
          );
        })}
      </Accordion>

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
