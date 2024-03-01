import type { RequestHandler } from '@sveltejs/kit';

import _ from 'lodash';
import { patch } from '$lib/actions/fetching';

export async function PATCH({ request }) {
  const body = await request.json();

  const response = await patch('/user', _.omit(body, ['token']), body.token);

  return response;
}
