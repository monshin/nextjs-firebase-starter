'use client';

import { useAuthToken } from '@/store/features/auth/hooks';

export default function Navbar() {
  const token = useAuthToken();

  return (
    <nav className="">
      <div className="hidden">{token}</div>
    </nav>
  );
}
