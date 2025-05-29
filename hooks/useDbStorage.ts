'use client';
import { useState } from 'react';
import { useAsync } from './useAsync';
import { State } from 'components/formElements';
import axios from 'axios';
import { API } from 'constants/apiUrls';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Storage } from '@prisma/client';

type Params = {
  fileIds?: string[];
  setFileIds?: (fileIds: string[]) => void;
};

export const useDbStorage = ({ fileIds, setFileIds }: Params) => {
  const [state, setState] = useState<State>([]);
  const [loading, setLoading] = useState(false);

  const getFile = async (id: string) => {
    const item = await axios.get<Storage | null>(API.STORAGE.INDEX, { params: { id } });
    return item?.data;
  };

  const getStateItemFile = async (id: string) => {
    const item = await getFile(id);
    if (item === null) {
      return null;
    }
    const blob = await axios.get(item?.url || item?.base64 || '', { responseType: 'blob' });
    return {
      id: item?.id,
      dbId: item?.id,
      base64: item?.base64,
      url: item?.url,
      loaded: true,
      error: false,
      file: new File([blob?.data], item?.name as string, {
        type: item?.type as string,
      }),
    };
  };

  const useGetFileQuery = (id?: string | null) =>
    useQuery({
      enabled: !!id,
      queryKey: ['storage', id],
      queryFn: async () => await getFile(id as string),
      refetchOnWindowFocus: false,
    });

  const useDeleteFileMutation = () =>
    useMutation({
      mutationFn: (id: string) => axios.delete(API.STORAGE.INDEX, { params: { id } }),
    });

  const useGetFileMutation = () =>
    useMutation({
      mutationFn: (id: string) => axios.get(API.STORAGE.INDEX, { params: { id } }),
    });

  useAsync(async () => {
    if (state.length || !fileIds || !fileIds.length || loading) return;
    const initialFileIds: string[] = fileIds;
    const arr: State = [];
    setLoading(true);
    for (let i = 0; i < initialFileIds.length; i++) {
      const item = await getStateItemFile(initialFileIds[i]);
      if (item === null) {
        initialFileIds.splice(i, 1);
        continue;
      }
      arr.push(item);
    }
    setLoading(false);
    setState(arr);
    setFileIds?.(initialFileIds);
  }, [fileIds, loading, state]);

  return {
    loading,
    state,
    getFile,
    getStateItemFile,
    useGetFileQuery,
    useDeleteFileMutation,
    useGetFileMutation,
  };
};
