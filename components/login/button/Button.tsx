'use client';

import { cn } from '@/lib/style';

export default function LoginButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn('flex justify-center items-center p-1', className)}
      {...props}
    >
      {children}
    </button>
  );
}
