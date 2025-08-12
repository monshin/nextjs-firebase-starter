'use client';

import {
  useAuthHadCheckLogin,
  useAuthToken,
} from '@/store/features/auth/hooks';

export default function AuthWrapper({ children }: React.PropsWithChildren) {
  const token = useAuthToken();
  const hadCheckLogin = useAuthHadCheckLogin();

  if (token) {
    return children;
  }

  if (hadCheckLogin) {
    return <div>你沒有權限</div>;
  }

  return null;
}
