import { Storage, STORAGE_ACCESS } from '@prisma/client';
import { getLoginSession } from 'lib/auth';
import prisma from 'lib/prisma';
import supabase, { uploadFile } from 'lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { exclude, fileToDataUrlNodeJS } from 'utils';

export async function GET(req: NextRequest) {
  const session = await getLoginSession();
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: `File id is required parameter` }, { status: 500 });

  const file = await prisma.storage.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      size: true,
      type: true,
      name: true,
      base64: true,
      url: true,
      access: true,
      userId: true,
    },
  });

  if (file?.access === 'PRIVATE' && session?.id !== file?.userId)
    return NextResponse.json({ error: `Not your file` }, { status: 500 });

  if (!file) {
    return NextResponse.json(null);
  }

  return NextResponse.json(exclude((file || {}) as Storage, ['access', 'userId']));
}

export async function POST(req: NextRequest) {
  const session = await getLoginSession();
  if (!session?.id) return NextResponse.json({ error: `Not authorized` }, { status: 500 });
  // try to upload to supabase, if fail upload to storage as b64
  const fd = await req.formData();
  const file = fd.get('file') as File;
  const access = fd.get('access') as STORAGE_ACCESS;
  const bucket = fd.get('bucket') as string;
  const path = fd.get('path') as string;
  const id = fd.get('id') as string;

  const bucketName = bucket || 'storage';
  // folder with user id
  let pathName = `${session?.id}/`;
  if (path) {
    pathName += `${path}/`;
  }
  const fileName = `${id}-${file.name}`;
  const finalName = pathName + fileName;

  const alreadyExists = await prisma.storage.findFirst({
    where: {
      userId: session?.id,
      name: fileName,
      bucketName,
      path: pathName,
      size: file.size,
      type: file.type,
    },
  });

  if (alreadyExists) {
    return NextResponse.json(alreadyExists);
  }

  try {
    if (supabase) {
      const retrieveBucket = await supabase.storage.getBucket(bucketName);
      if (!retrieveBucket.data?.id) {
        await supabase.storage.createBucket(bucketName, {
          public: true,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }

  let url = '';
  try {
    if (supabase) {
      const uploadToSupabase = await uploadFile({
        file,
        bucket: bucketName,
        name: finalName,
      });

      if (!uploadToSupabase.error) {
        const { data } = supabase.storage.from(bucketName).getPublicUrl(finalName);
        url = data?.publicUrl || '';
      }
    }
  } catch (e) {
    console.log(e);
  }

  let base64 = '';

  if (!url) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    base64 = fileToDataUrlNodeJS(buffer, file.type);
  }

  const createdFile = await prisma.storage.create({
    data: {
      bucketName,
      name: fileName,
      path: pathName,
      size: file.size,
      type: file.type,
      access: access || undefined,
      url,
      base64,
      userId: session?.id,
    },
  });

  return NextResponse.json(createdFile);
}

export async function DELETE(req: NextRequest) {
  const session = await getLoginSession();
  const { searchParams } = new URL(req.url);

  if (!session?.id) return NextResponse.json({ error: `Not authorized` }, { status: 500 });

  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: `File id is required parameter` }, { status: 500 });

  const file = await prisma.storage.findUnique({
    where: {
      id,
      userId: session?.id,
    },
  });

  if (!file)
    return NextResponse.json({ error: `File not found for current user` }, { status: 500 });

  try {
    if (supabase) {
      if (file?.bucketName && file?.path && file?.name && file?.url) {
        const { error } = await supabase.storage
          .from(file?.bucketName)
          .remove([`${file?.path}${file?.name}`]);

        if (error)
          return NextResponse.json(
            { error: `Couldn't delete file with id = ${id}` },
            { status: 500 }
          );
      }
    }
  } catch (e) {
    console.log(e);
  }

  await prisma.storage.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(null);
}
