import type { RequestHandler } from '@sveltejs/kit';

import { post } from '$lib/actions/fetching';

export async function POST({ request }) {
	const body = await request.json();

	const response = await post(
		'/assistant/initialize',
		{
			resume: body.resume,
			jobDescription: body.jobDescription
		},
		body.token
	);

	return response;
}
