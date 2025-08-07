// import { API_HOST_URL, API_KEY, API_VERSION, APP_VERSION } from '@/constants';
import { API_HOST_URL } from '@/constants';

const baseHeaders: Record<string, string> = {
  // version: API_VERSION,
  // app_version: APP_VERSION,
  // apikey: API_KEY,
  'Content-Type': 'application/json',
};

export function getApiHeaders(token?: string | null) {
  if (token) {
    return { ...baseHeaders, token };
  } else {
    return { ...baseHeaders };
  }
}

function ApiFetch(
  url: string,
  token?: string | null,
  option?: RequestInit,
  timeout?: number
) {
  const controller = new AbortController();
  let timeoutId;
  if (timeout) {
    timeoutId = setTimeout(() => controller.abort(), timeout);
  }
  return fetch(`${API_HOST_URL}${url}`, {
    ...option,
    headers: getApiHeaders(token),
    signal: controller.signal,
  });
}
export default ApiFetch;
