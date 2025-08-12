'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAuthToken } from '@/store/features/auth/hooks';

export default function AuthWrapper({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnUrl = searchParams.get('returnUrl');

  const token = useAuthToken();

  useEffect(() => {
    if (!!token) {
      if (returnUrl) {
        router.push(returnUrl);
      } else {
        router.push('/');
      }
    }
  }, [returnUrl, router, token]);

  return children;
}
