import { host } from '$lib/config';
import { redirect } from '@sveltejs/kit';

function createHeaders(token = '') {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'access-control-expose-headers': 'x-assistant-id'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

function handleNavigation(status: number) {
  if (status === 401) {
    redirect(307, '/login');
  }
}

export async function get(endpoint = '/', token = '') {
  const url = host + endpoint;

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: createHeaders(token)
  });
  if (!response.ok) {
    const data = await response.json();

    console.error(data);

    handleNavigation(response.status);
    throw new Error(data['message'] ? data['message'] : 'Failed to Get');
  }

  return response;
}

export async function post(endpoint = '/', data = {}, token = '') {
  const url = host + endpoint;

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: createHeaders(token),
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const data = await response.json();

    console.error(data);

    handleNavigation(response.status);
    throw new Error(data['message'] ? data['message'] : 'Failed to Post');
  }

  return response;
}

export async function remove(endpoint = '/', token = '') {
  const url = host + endpoint;

  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    headers: createHeaders(token)
  });
  if (!response.ok) {
    const data = await response.json();

    console.error(data);

    handleNavigation(response.status);
    throw new Error(data['message'] ? data['message'] : 'Failed to Delete');
  }

  return response;
}

export async function patch(endpoint = '/', data = {}, token = '') {
  const url = host + endpoint;

  const response = await fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    headers: createHeaders(token),
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    console.error(data);

    handleNavigation(response.status);
  }

  return response;
}
