'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Button from './Button';

import { cn } from '@/lib/style';

interface IProps {
  className?: string;
}

export default function ButtonGoogle({ className }: IProps) {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = useCallback(() => {
    if (!pathname.startsWith('/login')) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

  return (
    <Button
      type="button"
      className={cn('text-black border', className)}
      onClick={onClick}
    >
      登入
    </Button>
  );
}
