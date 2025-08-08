import { cookies } from 'next/headers';

import StoreProvider from '../components/StoreProvider';
import LoginPlugin from '../components/LoginPlugin';
import ToastProvider from '@/components/ToastProvider';

import './globals.css';

export { Metadata_Base as metadata } from '@/constants/metadata';

export default async function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  console.log('token', token);
  
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <body className="text-(length:--fontSize-default) antialiased">
        <StoreProvider token={token}>
          <LoginPlugin />
          {children}
          <ToastProvider />
        </StoreProvider>
      </body>
    </html>
  );
}
