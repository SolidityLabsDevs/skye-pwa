import { getLoginSession } from 'lib/auth';
import prisma from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getTracks } from './queries';
import {
  TPatchTrackSchema,
  TPostTrackSchema,
  patchTrackSchema,
  postTrackSchema,
} from './validators';
import { exclude } from 'utils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const error = NextResponse.error();

  const limit = searchParams.get('limit') || 20;
  const offset = searchParams.get('offset') || 0;
  const search = searchParams.get('search') || '';

  const list = await getTracks(+limit, +offset, search);
  if (!list) return error;

  const res = NextResponse.json(list);
  return res;
}

export async function POST(req: NextRequest) {
  const body: TPostTrackSchema = await req.json();
  const session = await getLoginSession();

  const error = NextResponse.error();

  const isValid = (await postTrackSchema.safeParse(body)).success;

  if (session?.role !== 'ADMIN' || !isValid) {
    return error;
  }

  const created = await prisma.audio.create({
    data: {
      ...body,
      userId: session?.id as string,
    },
  });

  return NextResponse.json(created);
}

export async function PATCH(req: NextRequest) {
  const body: TPatchTrackSchema & { userId: string; audioCoverImage: unknown; audioFile: unknown } =
    await req.json();
  const session = await getLoginSession();

  const error = NextResponse.error();

  const isValid = (await patchTrackSchema.safeParse(body)).success;

  if (session?.role !== 'ADMIN' || !isValid) {
    return error;
  }

  const id = body.id;

  const track = await prisma.audio.findUnique({
    where: {
      id,
    },
  });

  let update = {};
  if (!body?.audioCoverImageId && track?.audioCoverImageId) {
    update = {
      audioCoverImageId: undefined,
      audioCoverImage: {
        disconnect: {
          id: track?.audioCoverImageId,
        },
      },
    };
  } else if (body?.audioCoverImageId && track?.audioCoverImageId !== body?.audioCoverImageId) {
    update = {
      audioCoverImage: {
        connect: {
          id: body?.audioCoverImageId,
        },
      },
    };
  }

  if (body?.audioCoverImageId && track?.audioCoverImageId !== body?.audioCoverImageId) {
    await prisma.audio.update({
      where: {
        id,
      },
      data: {
        ...update,
      },
    });
  }

  let update2 = {};
  if (!body?.audioFileId && track?.audioFileId) {
    update2 = {
      audioFileId: undefined,
      audioFile: {
        disconnect: {
          id: track?.audioFileId,
        },
      },
    };
  } else if (body?.audioFileId && track?.audioFileId !== body?.audioFileId) {
    update2 = {
      audioFile: {
        connect: {
          id: body?.audioFileId,
        },
      },
    };
  }

  if (body?.audioFileId && track?.audioFileId !== body?.audioFileId) {
    await prisma.audio.update({
      where: {
        id,
      },
      data: {
        ...update2,
      },
    });
  }

  // if users can create posts, you must also compare post author id and session Id,
  // here I`m not doing this `cause I`m operate with admins and they all can edit other admin`s posts
  const updated = await prisma.audio.update({
    where: {
      id,
    },
    data: {
      ...exclude(body, [
        'audioCoverImageId',
        'userId',
        'audioCoverImage',
        'audioFileId',
        'audioFile',
      ]),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const error = NextResponse.error();
  const session = await getLoginSession();

  if (!id || session?.role !== 'ADMIN') return error;

  await prisma.audio.delete({
    where: {
      id,
    },
  });

  return NextResponse.json('');
}
