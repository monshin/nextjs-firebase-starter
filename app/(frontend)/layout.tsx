import Navbar from '@/components/Navbar';

export default function FrontendLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
