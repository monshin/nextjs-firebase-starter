'use client';

import { useAppSelector } from '@/store/hooks';

export const useAuthToken = () => {
  return useAppSelector((state) => state.auth.userData.token);
};

export const useAuthHadCheckLogin = () => {
  return useAppSelector((state) => state.auth.hadCheckLogin);
};
