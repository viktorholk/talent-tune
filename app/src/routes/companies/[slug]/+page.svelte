<script>
	export let data;

	import { marked } from 'marked';

	import { goto } from '$app/navigation';

	let company = data.company;

	function navigateToJobListing(id) {
		goto(`/job-listings/${id}`);
	}
</script>

<div class="flex flex-col justify-center items-center">
	<div class="bg-white rounded shadow-md p-5">
		<h1 class="text-xl font-bold">About the Company</h1>
		<ul class="list-disc px-6">
			<li>
				<strong>Name</strong>: {company.name}
			</li>
			<li>
				<strong>Description</strong>: {company.description}
			</li>
			<li>
				<strong>Country</strong>: {company.country}
			</li>
			<li>
				<strong>City</strong>: {company.city}
			</li>
			<li>
				<strong>Zip</strong>: {company.zip}
			</li>
			<li>
				<strong>Zip</strong>: {company.vat}
			</li>
		</ul>
	</div>
	{#if company.jobListings && company.jobListings.length > 0}
		<table class="table-auto">
			<thead>
				<tr>
					<th>Title</th>
					<th>Tags</th>
					<th>created_at</th>
				</tr></thead
			>
			<tbody>
				{#each company.jobListings as listing}
					<tr
						class="hover:translate-x-1 hover:cursor-pointer transition ease-in-out"
						on:click={() => navigateToJobListing(listing._id)}
					>
						<td>{listing.title}</td>
						<td>{listing.tags.join(', ')}</td>
						<td>{listing.created_at}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
