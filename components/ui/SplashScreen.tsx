'use client';
import Image from 'next/image';
import { FC, memo, useEffect } from 'react';

type SplashScreenProps = {
  load: () => void;
};

export const SplashScreen: FC<SplashScreenProps> = memo(({ load }) => {
  useEffect(() => {
    setTimeout(() => {
      load();
    }, 2000);
  }, []);

  return (
    <div className="z-50 grid w-screen h-screen transition-all bg-gray-900 bg-neutralBg animate-popup place-items-center">
      <Image id="icon" alt="icon" src={'/images/assets/2.png'} height={32} width={32} />
    </div>
  );
});
