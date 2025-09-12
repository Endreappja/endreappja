export async function authFetch(url: string, options: RequestInit, getToken: () => Promise<string>) {
  const token = await getToken();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers });
}