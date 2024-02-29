import type { PageLoad } from './$types';
import { get } from '$lib/actions/fetching';

import { jwtDecode } from 'jwt-decode';
import _ from 'lodash';

export const load: PageLoad = async ({ cookies }) => {
  const token = JSON.parse(cookies.get('jwt') || '{}')['token'];

  const decoded: { company: any } = jwtDecode(token);

  let jobListings = [];

  if (decoded.company) {
    const response = await get('/job-listings?company_id=' + decoded.company._id, token);

    const body = await response.json();
    jobListings = body.data;
  }

  return {
    jobListings
  };
};
