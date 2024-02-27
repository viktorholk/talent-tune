<script>
	export let data;

	import { marked } from 'marked';

	let listing = data.jobListing;
</script>

<div class="flex py-6 gap-2">
	{#if listing.title}
		<div class="w-full">
			<div class="p-6 bg-white rounded shadow-md">
				<h1 class="text-2xl font-black text-indigo-600">{listing.title}</h1>
				<div class="border-5 border-gray-400 border-b-2 mb-5"></div>

				<article class="prose">
					{@html marked.parse(listing.description || '')}
				</article>
			</div>
		</div>

		<div class="flex flex-col w-1/2 max-h-60 bg-white rounded shadow-md">
			<div class="p-6 h-full">
				<h1 class="text-xl font-bold">About the Company</h1>
				<ul class="list-disc px-6">
					<li>
						<strong>Name</strong>: {listing.company.name}
					</li>
					<li>
						<strong>Description</strong>: {listing.company.description}
					</li>
					<li>
						<strong>Country</strong>: {listing.company.country}
					</li>
				</ul>
			</div>

			<div class="flex justify-center">
				<a
					href="/companies/{listing.company._id}"
					class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded mb-2"
				>
					More Infomation
				</a>
			</div>
		</div>
	{/if}
</div>
