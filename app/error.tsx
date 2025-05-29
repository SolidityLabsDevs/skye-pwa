'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'components/ui/Button';

type ErrorProps = {
  error?: {
    message?: string;
  };
  reset: () => void;
};

const Error: FC<ErrorProps> = ({ error, reset }) => {
  return null;
  const router = useRouter();
  return (
    <div className="absolute top-0 left-0 grid w-full h-full px-2 place-items-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="w-full text-center font-extrabold text-[2rem] lg:text-[4rem] text-[#273141] align-middle">
          Error
        </h1>
        <h2 className="text-base lg:text-[2rem] text-black/25">{error?.message}</h2>
        <Button onClick={() => reset()}>Retry</Button>
        <Button onClick={() => router.push('/')}>Return Home</Button>
      </div>
    </div>
  );
};

export default Error;
