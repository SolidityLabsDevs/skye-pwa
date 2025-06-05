'use client';
import { PropsWithChildren, createContext, use, useState } from 'react';

type Context = {
  audio?: AudioFull;
};

type Actions = unknown;

export const AudioOverviewContext = createContext({
  audio: undefined,
} as Context & Actions);

export const AudioOverviewContextProvider = AudioOverviewContext.Provider;
export const useAudioOverviewContext = () => use(AudioOverviewContext);

import { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import { AudioFull } from 'types/entities';

type AudioOverviewContextProps = {
  audioData: AudioFull;
};

const AudioOverviewProviderComponent: FC<PropsWithChildren<AudioOverviewContextProps>> = memo(
  ({ children, audioData }) => {
    const [audio] = useState(audioData);

    return (
      <AudioOverviewContextProvider
        value={{
          audio,
        }}
      >
        {children}
      </AudioOverviewContextProvider>
    );
  }
);

export const AudioOverviewProvider = dynamic(
  () => Promise.resolve(AudioOverviewProviderComponent),
  {
    ssr: false,
  }
);
