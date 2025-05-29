'use client';
import axios from 'axios';
import { memo, FC, useEffect } from 'react';
import { useUserStore } from 'stores';
import { User } from '@prisma/client';
import { API } from 'constants/apiUrls';

type SessionProps = {
  data: User & { exp: number };
};

export const Session: FC<SessionProps> = memo(({ data }) => {
  const loginSessionState = useUserStore(state => state.login);
  const logoutSessionState = useUserStore(state => state.logout);

  useEffect(() => {
    (async () => {
      if (Date.now() > (data?.exp * 1_000 || 0)) {
        await axios.post(API.AUTH.LOGOUT);
        logoutSessionState();
        return;
      }
      (data || {}) && loginSessionState({ user: data });
    })();
  }, [data]);

  return null;
});
