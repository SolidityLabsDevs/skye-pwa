'use client';
import { FC, memo } from 'react';

import { Avatar } from 'components/ui/Avatar';
import { AvatarProps } from 'components/ui';
import { Skeleton, SkeletonProps } from 'components/ui/Skeleton';
import { useDbStorage } from 'hooks';

type AvatarStorageProps = {
  imageId?: string;
  imageSrc?: string;
  avatarProps?: AvatarProps;
  skeletonProps?: SkeletonProps;
};

export const AvatarStorage: FC<AvatarStorageProps> = memo(
  ({ imageId, imageSrc, avatarProps, skeletonProps }) => {
    const { useGetFileQuery } = useDbStorage({}); // part of paid feature "Storage"
    const { isFetching, data } = useGetFileQuery(imageSrc ? undefined : imageId); // part of paid feature "Storage"

    if (isFetching) {
      return <Skeleton type="avatar" size={avatarProps?.size} {...skeletonProps} />;
    }

    return <Avatar src={imageSrc || data?.url || data?.base64 || undefined} {...avatarProps} />;
  }
);
