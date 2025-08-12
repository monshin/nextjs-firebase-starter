'use client';

import { cn } from '@/lib/utils';

export default function LoginButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'flex flex-nowrap justify-center items-center p-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
