let activeRequests = 0;
let setLoading: ((loading: boolean) => void) | null = null;

export function registerLoadingCallback(cb: (loading: boolean) => void) {
  setLoading = cb;
}

export async function authFetch<T>(
  url: string,
  options: RequestInit,
  getToken: () => Promise<string>
) {
  activeRequests++;
  setLoading?.(true);

  try {
    const token = await getToken();
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(url, { ...options, headers });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    return (await res.json()) as T;
  } finally {
  activeRequests--;
  if (activeRequests <= 0) {
    activeRequests = 0;
    setLoading?.(false);
  }
}
}