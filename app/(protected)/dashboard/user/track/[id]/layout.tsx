import prisma from 'lib/prisma';
import { redirect } from 'next/navigation';
import { FC, memo } from 'react';
import Page from './page';

type PageProps = {
  params: {
    id?: string;
  };
};

const Layout: FC<PageProps> = memo(async props => {
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

  return <Page audio={audio} />;
});

export default Layout;
