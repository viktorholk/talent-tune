import type { PageLoad } from './$types';
import { get } from '$lib/actions/fetching';

import _ from 'lodash';

export const load: PageLoad = async ({ cookies }) => {
	const token = JSON.parse(cookies.get('jwt') as string).token as string;
	const response = await get('/companies', token);

	const companies = [];
	const jobListings = [];

	// Split up the companies and job listings from the response

	const responseData = await response.json();

	for (const company of responseData.data) {
		companies.push(
			_.pick(company, [
				'_id',
				'vat',
				'name',
				'description',
				'country',
				'zip',
				'city',
				'address',
				'jobListings'
			])
		);

		if (company.jobListings) {
			for (const jobListing of company.jobListings) {
				jobListings.push({
          company: company,
					..._.pick(jobListing, ['_id', 'title', 'description', 'tags']),
          active: false
				});
			}
		}
	}

	console.log(jobListings);

	return {
		companies,
		jobListings
	};
};
