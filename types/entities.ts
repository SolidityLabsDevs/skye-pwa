import { Audio, Storage, User } from '@prisma/client';

export enum AuthProviders {
  jwt = 'jwt',
  google = 'google',
  apple = 'apple',
  twitter = 'twitter',
  facebook = 'facebook',
  linkedin = 'linkedin',
}

export type AudioFull = Audio & {
  audioFile?: Storage | null;
  audioCoverImage?: Storage | null;
  user?: User | null;
};
