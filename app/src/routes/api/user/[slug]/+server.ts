import { remove } from "$lib/actions/fetching";

export async function DELETE({params, request}) {
	const body = await request.json();
	const id = params.slug;
    console.log("response1");
	const response = await remove(
		'/profile/documents/'+ id,
		body.token
	);

    console.log("response");
	return response;
}