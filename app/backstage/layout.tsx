import AuthWrapper from './AuthWrapper';

export default function BackstageLayout({ children }: React.PropsWithChildren) {
  return (
    <main>
      <AuthWrapper>{children}</AuthWrapper>
    </main>
  );
}
