'use client';

import { useCallback } from 'react';

import Button from './Button';

import { cn } from '@/lib/style';
import { useAppDispatch } from '@/store/hooks';
import { authLoginWithGoogle } from '@/store/features/auth/actions';

interface IProps {
  className?: string;
}

export default function ButtonGoogle({ className }: IProps) {
  const dispatch = useAppDispatch();

  const onClick = useCallback(() => {
    dispatch(authLoginWithGoogle());
  }, []);

  return (
    <Button
      type="button"
      className={cn('text-black border', className)}
      onClick={onClick}
    >
      {/* <span className="icon icon-login-google" /> */}
      使用 Google 登入/註冊
    </Button>
  );
}
