import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { dataUrlToFile } from 'utils/dataUrlToFile';

const supabaseKey = process.env.SUPABASE_PROJECT_ANON_KEY as string;
const supabaseUrl = process.env.SUPABASE_PROJECT_URL as string;

let supabase: SupabaseClient | undefined;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (e) {
  console.log(`Supabase init error: `, e);
}

// TODO IMPORTANG: create public bucket called "storage" in supabase and give all the rights in bucket's policy
export const uploadFile = async (params: { file: File; name?: string; bucket?: string }) => {
  const { name, bucket = 'storage', file } = params;

  if (!file.name && !name) {
    throw new Error('No file name provided');
  }

  if (!supabase) throw new Error('No supabase client initialized');

  const { data, error } = await supabase?.storage
    .from(bucket)
    .upload((name || file.name) as string, file, {
      upsert: true,
    });

  const path = `${process.env.SUPABASE_PROJECT_URL}/storage/v1/object/public/${bucket}/${data?.path}`;

  return {
    path,
    error,
  };
};

// TODO IMPORTANG: create public bucket called "storage" in supabase and give all the rights in bucket's policy
export const uploadFileBase64 = async (params: {
  name: string;
  bucket?: string;
  base64: string;
}) => {
  const { name, bucket = 'storage', base64 } = params;

  if (!name) {
    throw new Error('No file name provided');
  }

  if (!supabase) throw new Error('No supabase client initialized');

  const { data, error } = await supabase?.storage
    .from(bucket)
    .upload(name, dataUrlToFile(base64, name) as File, {
      contentType: 'image/png',
      upsert: true,
    });

  const path = `${process.env.SUPABASE_PROJECT_URL}/storage/v1/object/public/${bucket}/${data?.path}`;

  return {
    path,
    error,
  };
};

export default supabase;
