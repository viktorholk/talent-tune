import type { RequestHandler } from '@sveltejs/kit';

import _ from 'lodash';
import { patch, remove } from '$lib/actions/fetching';

export async function PATCH({ request }) {
  const body = await request.json();

  const response = await patch('/user', _.omit(body, ['token']), body.token);

  return response;
}

export async function DELETE({ request }) {
  const body = await request.json();
  const response = await remove(`/user`, body.token);
  return response;
}
