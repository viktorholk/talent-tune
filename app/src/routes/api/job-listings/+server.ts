import type { RequestHandler } from '@sveltejs/kit';

import { get, post, remove, patch} from '$lib/actions/fetching';
import _ from 'lodash';
export async function POST({ request }) {
  const body = await request.json();

  const response = await post(
    '/job-listings',
    {
      title: body.title,
      description: body.description,
      tags: body.tags
    },
    body.token
  );

  return response;
}

export async function DELETE({ request }) {
  const body = await request.json();
  const response = await remove(`/job-listings/${body.id}`, body.token);
  return response;
}

export async function PATCH({ request }) {
  const body = await request.json();
  const response = await patch(
    `/job-listings/${body.id}`,
    _.omit(body, 'id', 'token'),
    body.token
  );
  return response;
}
