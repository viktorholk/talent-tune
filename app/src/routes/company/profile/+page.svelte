<script>
	let companyName = 'Company Name';
	let companyDescription = 'Company Description';
	let companyLogo = 'path/to/company-logo.png';
	let companyLocation = 'Company Location';
	let companyWebsite = 'https://www.company-website.com';
</script>

<main class="flex flex-col items-center py-6 sm:py-12">
	<div class="p-6 bg-white rounded shadow-md w-full max-w-md text-center">
		<h1 class="text-2xl font-bold mb-4">{companyName}</h1>
		<img
			src={companyLogo}
			alt="Company Logo"
			class="w-32 h-32 object-cover rounded-full mx-auto mb-4"
		/>
		<p class="mb-2">{companyDescription}</p>
		<p class="mb-2"><span class="font-bold">Location:</span> {companyLocation}</p>
		<a href={companyWebsite} target="_blank" class="text-blue-500 hover:underline">Visit Website</a>
	</div>
</main>
