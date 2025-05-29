'use client';
import axios from 'axios';
import { API } from 'constants/apiUrls';
import { useState } from 'react';
import { useUserStore } from 'stores';

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const logout = useUserStore(state => state.logout);

  const fn = async () => {
    setLoading(true);
    await axios.post(API.AUTH.LOGOUT);
    logout();
    setLoading(false);
    window.location.reload();
  };

  return [fn, loading] as const;
};
