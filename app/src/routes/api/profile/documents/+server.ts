import type { RequestHandler } from '@sveltejs/kit';

import { post, remove } from '$lib/actions/fetching';
export async function POST({ request }) {
  const body = await request.json();

  const response = await post(
    '/profile/documents',
    {
      title: body.title,
      encoded: body.encoded
    },
    body.token
  );

  return response;
}

export async function DELETE({ request }) {
  const body = await request.json();

  const id = body.id;

  const response = await remove(`/profile/documents/${id}`, body.token);

  return response;
}
