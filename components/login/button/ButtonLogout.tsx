'use client';

import { useCallback } from 'react';

import Button from './Button';

import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { authLogout } from '@/store/features/auth/actions';

interface IProps {
  className?: string;
}

export default function ButtonGoogle({ className }: IProps) {
  const dispatch = useAppDispatch();

  const onClick = useCallback(() => {
    dispatch(authLogout());
  }, [dispatch]);

  return (
    <Button type="button" className={cn('border', className)} onClick={onClick}>
      登出
    </Button>
  );
}
