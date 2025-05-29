'use client';
import { FC, memo, useEffect, useId, useState } from 'react';
import cn from 'classnames';
import { AiFillDelete } from 'react-icons/ai';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { toast } from 'react-toastify';
import { fileResize, fileToDataUrl } from 'utils';
import { Avatar } from 'components/ui/Avatar';
import { Card } from 'components/ui/Card';
import { ListItem } from 'components/ui/ListItem';

type ImageInputProps = {
  value?: string[];
  onChange?: (file: string | string[]) => void;
  width?: number;
  height?: number;
  label?: string;
  className?: string;
  resize?: boolean;
  multiple?: boolean;
  sizeLimitMb?: number;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  type?: 'base64' | 'file';
};

export const ImageInput: FC<ImageInputProps> = memo(
  ({
    value = [],
    onChange,
    width = 300,
    height = 200,
    label = 'Upload Image',
    error,
    resize = true,
    multiple,
    sizeLimitMb = 6,
  }) => {
    const id = useId();
    const [images, setImages] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>(value);

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      //@ts-expect-error ignore
      setImages([...e.target.files]);
    };

    useEffect(() => {
      if (!images.length) return;

      (async () => {
        const urls = [];
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const sizeMB = file.size / 1024 / 1024;

          if (sizeMB > sizeLimitMb) {
            toast.error(`Skipped ${file.name} | Image size must be less than 6 MB`);
            continue;
          }

          let _file = (await fileToDataUrl(file)) as string;
          if (resize) {
            _file = (await fileResize(_file, width, height)) as string;
          }
          urls.push(_file);
        }
        setImageUrls(urls);
      })();
    }, [images, resize]);

    const removeImage = (idx: number) => {
      const strArr = [...imageUrls];
      strArr.splice(idx, 1);
      setImageUrls(strArr);
      const filesArr = [...images];
      filesArr.splice(idx, 1);
      setImages(filesArr);
    };

    useEffect(() => {
      onChange?.(imageUrls);
    }, [imageUrls]);

    return (
      <Card
        className={cn({
          '!border-red-500': !!error,
        })}
        title={label}
      >
        {/* <label htmlFor={id} className={cn('cursor-pointer bg-red-500')}> */}
        <input
          id={id}
          type="file"
          accept="image/*"
          multiple={multiple}
          // className="hidden"
          onChange={_onChange}
          className="text-defaultText"
        />
        {/* <ListItem value="Upload" withArrow title="Upload" icon={<AiOutlineCamera size={45} />} />
        </label> */}
        <div className="flex flex-col">
          {imageUrls.map((image, idx) => (
            <ListItem
              value={images?.[idx]?.name || `Image ${idx + 1}`}
              key={image}
              withDivider
              className="!justify-start"
              icon={
                <>
                  <Avatar size={20} className="w-5 h-5" rounded src={image} /> <AiFillDelete />
                </>
              }
              onClick={() => removeImage(idx)}
            />
          ))}
        </div>
      </Card>
    );
  }
);
