'use client';

import Link from 'next/link';

import ButtonLogout from './login/button/ButtonLogout';
import ButtonLogin from './login/button/ButtonLogin';

import {
  useAuthHadCheckLogin,
  useAuthToken,
} from '@/store/features/auth/hooks';

export default function Navbar() {
  const token = useAuthToken();
  const hadCheckLogin = useAuthHadCheckLogin();

  return (
    <nav className="flex p-1">
      <div>
        <Link className='text-3xl' href="/">Logo</Link>
      </div>
      <div className="grow flex flex-wrap justify-end">
        {token ? <ButtonLogout /> : hadCheckLogin && <ButtonLogin />}
        <div className="hidden">{token}</div>
      </div>
    </nav>
  );
}
