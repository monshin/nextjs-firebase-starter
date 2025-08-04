import { IS_PROD } from '@/constants';

export default function RootPage() {
  return <div>首頁{String(IS_PROD)}</div>;
}
