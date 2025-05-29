'use client';
import { FC, PropsWithChildren, memo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ProvidersProps = unknown;

export const Providers: FC<PropsWithChildren<ProvidersProps>> = memo(({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <ToastContainer theme={'dark'} />
    </>
  );
});
