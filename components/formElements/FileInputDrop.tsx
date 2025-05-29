'use client';
import cn from 'classnames';
import { RequiredStar } from 'components/ui/RequiredStar';
import { FC, memo, ReactElement } from 'react';
import Dropzone, { DropzoneProps } from 'react-dropzone';

import { FiUploadCloud } from 'react-icons/fi';
import { humanFileSize } from 'utils';

export type FileInputDropProps = Omit<DropzoneProps, 'accept'> & {
  onAddFiles?: (files: File[]) => void;
  customDrop?: ReactElement;
  label?: string;
  className?: string;
  contentClassName?: string;
  error?: boolean;
  required?: boolean;
  showIcon?: boolean;
  accept?: Array<Partial<keyof typeof ACCEPT>>;
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

export const FileInputDrop: FC<FileInputDropProps> = memo(
  ({
    onAddFiles,
    customDrop,
    showIcon = true,
    error,
    maxFiles = 5,
    maxSize = 5_000_000,
    accept = ['image/*'],
    label,
    className,
    contentClassName,
    required,
    ...props
  }) => {
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

    return (
      <div className={cn('w-full max-w-[350px]', className)}>
        {label && (
          <p className="w-full text-left text-defaultText">
            {label} <RequiredStar visible={required} />{' '}
          </p>
        )}
        <Dropzone
          onDropAccepted={async files => {
            onAddFiles?.(files);
          }}
          maxFiles={maxFiles}
          maxSize={maxSize}
          accept={acceptReduced}
          {...props}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className={cn(
                'w-full flex flex-col items-center bg-onNeutralBg justify-center py-4 px-6 rounded-[8px] border-[1px] border-default border-solid cursor-pointer hover:opacity-70',
                {
                  'border-red-500': error,
                },
                contentClassName
              )}
            >
              <input {...getInputProps()} />

              {!customDrop && (
                <>
                  {showIcon && (
                    <div className="p-[12px] rounded-full bg-primaryForeground border-solid border-default border-[8px]">
                      <FiUploadCloud size={24} color="" className="text-primary" />
                    </div>
                  )}
                  <label className="mb-1 text-center text-primary text-[0.875rem]">
                    <span className="font-semibold ">Click to upload</span> or drag and drop
                  </label>
                  <label className="text-defaultText text-center text-[0.75rem]">
                    {formatsReduced} ({humanFileSize(maxSize)} max. file size) max. {maxFiles} files
                  </label>
                </>
              )}
              {customDrop}
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
);
