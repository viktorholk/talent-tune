<script>
	export let data;

	import { marked } from 'marked';

	import { goto } from '$app/navigation';
  import Card from "$lib/components/Card.svelte";

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
{#each company.jobListings as listing}

        <Card  props={{...{
          title: listing.title,
          subtitle: listing.company.name,
          tags: listing.tags
        }}}/>
								{/each}

	{/if}
</div>
