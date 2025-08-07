import Navbar from '@/components/Navbar';

export default function ForestageLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
