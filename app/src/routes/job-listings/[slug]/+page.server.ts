import type { PageLoad } from './$types';
import { get } from '$lib/actions/fetching';

export const load: PageLoad = async ({ params, cookies }) => {
  const token = JSON.parse(cookies.get('jwt') as string).token as string;

  const id = params.slug;

  const response = await get('/job-listings/' + id, token);

  const data = await response.json();

  return {
    jobListing: data.data
  };
};
