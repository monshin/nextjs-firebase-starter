'use client';

import { useEffect, useRef } from 'react';
import { onAuthStateChanged, type Unsubscribe } from 'firebase/auth';

import { useAppDispatch } from '@/store/hooks';
import {
  authClear,
  authSetHadCheckLogin,
  authSetUser,
} from '@/store/features/auth/slice';
// import { useLoadingStore } from "@/store/loadingStore";

import FirebaseAuth from '@/lib/firebase/auth';

export default function LoginPlugin() {
  const unregisterAuthObserver = useRef<Unsubscribe | null>(null);

  const dispatch = useAppDispatch();

  // const showLoadingDialog = useLoadingStore((state) => state.showLoadingDialog);
  // const closeLoadingDialog = useLoadingStore(
  //   (state) => state.closeLoadingDialog
  // );

  useEffect(
    () => {
      if (unregisterAuthObserver.current) unregisterAuthObserver.current();
      unregisterAuthObserver.current = onAuthStateChanged(
        FirebaseAuth,
        async (user) => {
          // showLoadingDialog();
          if (user !== null) {
            const { currentUser } = FirebaseAuth;
            if (currentUser !== null && currentUser !== undefined) {
              try {
                const result = await currentUser.getIdTokenResult();
                dispatch(
                  authSetUser({
                    token: result.token,
                    uid: user.uid,
                    claims: result.claims,
                  })
                );
              } catch {
                dispatch(authClear());
                try {
                  FirebaseAuth.signOut();
                } catch {}
              } finally {
                // closeLoadingDialog();
                dispatch(authSetHadCheckLogin(true));
              }
            } else {
              dispatch(authClear());
              // closeLoadingDialog();
              dispatch(authSetHadCheckLogin(true));
            }
          } else {
            // closeLoadingDialog();
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
