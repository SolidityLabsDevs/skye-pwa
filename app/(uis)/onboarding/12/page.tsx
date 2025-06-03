'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import { Progress } from 'components/ui/Progress';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, memo, useEffect } from 'react';

type PageProps = unknown;

const number = 12;

const Page: FC<PageProps> = memo(() => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(`/onboarding/${number + 1}`);
    }, 5000);
  }, []);

  return (
    <MobileContainer className="flex flex-col items-center justify-center gap-8">
      <Image
        alt=""
        src="/images/assets/2.png"
        width={0}
        height={0}
        className="w-full h-full max-w-[170px] max-h-[203px] mx-auto"
      />
      <div>
        <p className=" text-center text-[1.625rem] font-bold text-[#e8e8e8]">Calculating</p>
        <p className="text-[#98a1bd] text-center  text-[0.75rem]">
          Analyzing subconscious blocks...
        </p>
      </div>
      <Progress
        className="w-full"
        barClassName="[background:linear-gradient(to_right,_#47326B_0%,_#914372_50%,_#AC714F_100%)]"
        progress={80}
      />
    </MobileContainer>
  );
});

export default Page;
