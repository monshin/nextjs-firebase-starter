'use client';

import { useEffect, useRef } from 'react';
import { onAuthStateChanged, type Unsubscribe } from 'firebase/auth';

import { useAppDispatch } from '@/store/hooks';
import { authSetHadCheckLogin } from '@/store/features/auth/slice';

import FirebaseAuth from '@/lib/firebase/auth';
import { authCheckUser } from '@/store/features/auth/actions';

export default function LoginPlugin() {
  const unregisterAuthObserver = useRef<Unsubscribe | null>(null);

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (unregisterAuthObserver.current) unregisterAuthObserver.current();
      unregisterAuthObserver.current = onAuthStateChanged(
        FirebaseAuth,
        async (user) => {
          if (user !== null) {
            dispatch(authCheckUser());
          } else {
            dispatch(authSetHadCheckLogin(true));
          }
        }
      );

      return () => {
        if (unregisterAuthObserver.current) unregisterAuthObserver.current();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
}
