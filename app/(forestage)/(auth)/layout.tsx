import AuthWrapper from "./AuthWrapper";

export default function ForestageLayout({ children }: React.PropsWithChildren) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
