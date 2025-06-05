import prisma from 'lib/prisma';
import { redirect } from 'next/navigation';
import { FC, memo, PropsWithChildren } from 'react';
import { AudioOverviewProvider } from 'contexts';

type PageProps = {
  params: {
    id?: string;
  };
};

const Layout: FC<PropsWithChildren<PageProps>> = memo(async props => {
  const params = await props.params;
  const id = params?.id;

  const audio = await prisma.audio.findFirst({
    where: {
      id,
    },
    include: {
      audioCoverImage: true,
      audioFile: true,
    },
  });

  if (!audio) redirect('/dashboard');

  return <AudioOverviewProvider audioData={audio}>{props?.children}</AudioOverviewProvider>;
});

export default Layout;
