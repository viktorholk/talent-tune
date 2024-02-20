import { host } from '$lib/config';

export async function post(url = '/', data = {}, token = '') {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'access-control-expose-headers': 'x-assistant-id'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${host}${url}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: headers,
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const data = await res.json();

    console.error(data);

    throw new Error(data['message'] ? data['message'] : 'Failed to fetch');
  }

  return res;
}
