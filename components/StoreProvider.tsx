'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';
import { authChangeToken } from '@/store/features/auth/slice';
import { toastShow } from '@/store/features/toast/actions';

interface IProps {
  token: string | undefined;
}

export default function StoreProvider({
  children,
  token,
}: React.PropsWithChildren<IProps>) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    if (!!token) {
      storeRef.current.dispatch(authChangeToken({ token }));
    }
    storeRef.current.dispatch(toastShow({ text: 'test' }));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
