import type { PageLoad } from './$types';
import { get } from '$lib/actions/fetching';

export const load: PageLoad = async ({ cookies }) => {
  const token = JSON.parse(cookies.get('jwt') as string).token as string;

  const response = await get('/profile/', token);

  const data = await response.json();

  return {
    profile: data
  };
};
