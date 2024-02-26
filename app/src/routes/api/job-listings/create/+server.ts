import type { RequestHandler } from '@sveltejs/kit';

import { post } from '$lib/actions/fetching';

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
