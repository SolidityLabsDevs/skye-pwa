'use client';
import { FC, memo } from 'react';
import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { useRouter } from 'next/navigation';

type NotFoundProps = unknown;

const NotFound: FC<NotFoundProps> = memo(() => {
  const router = useRouter();

  return (
    <Container
      extra
      extraClassName="bg-neutralBg"
      className="flex flex-col items-center justify-center min-h-screen gap-10 min-w-screen "
    >
      <h1 className="w-full text-center font-extrabold text-[2rem] lg:text-[4rem] text-defaultText align-middle">
        404 <span className="font-thin text-black/25">|</span> Not found
      </h1>
      <div className="flex flex-row flex-wrap gap-4">
        <Button href="/">Return Home</Button>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    </Container>
  );
});

export default NotFound;
