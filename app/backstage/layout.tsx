import Navbar from '@/components/Navbar';

export default function BackstageLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
