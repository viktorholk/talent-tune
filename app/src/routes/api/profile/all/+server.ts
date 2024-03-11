import type { RequestHandler } from '@sveltejs/kit';
import _ from 'lodash';

import { get } from '$lib/actions/fetching';

export async function POST({ request }) {

  const body = await request.json();

  const response = await get('/profile/all', body.token);

  return response;
}
