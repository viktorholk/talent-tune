<script  lang="ts">
	export let data;
	
	let job = data.data;
	let jobs = [
		{
			title: 'Software Engineer',
			description:
				'Responsible for designing, coding, and modifying software applications according to client requirements.'
		},
		{
			title: 'Data Scientist',
			description:
				'Responsible for analyzing complex datasets to discover insights and drive data-driven decision making.'
		},
		{
			title: 'Product Manager',
			description:
				'Responsible for defining and executing the product roadmap, gathering requirements, and managing the product lifecycle.'
		},
		{
			title: 'UX Designer',
			description:
				'Responsible for creating intuitive and user-friendly interfaces for digital products.'
		},
		{
			title: 'Marketing Specialist',
			description:
				'Responsible for developing and implementing marketing strategies to promote products or services.'
		},
		{
			title: 'Financial Analyst',
			description:
				'Responsible for analyzing financial data, preparing reports, and providing insights to support financial decision making.'
		},
		{
			title: 'Graphic Designer',
			description:
				'Responsible for creating visual concepts and designs for various mediums, such as print and digital.'
		},
		{
			title: 'Content Writer',
			description:
				'Responsible for creating engaging and informative content for websites, blogs, and other platforms.'
		},
		{
			title: 'Sales Representative',
			description:
				'Responsible for selling products or services to customers and maintaining relationships with clients.'
		},
		{
			title: 'Human Resources Manager',
			description:
				'Responsible for overseeing HR functions, such as recruitment, employee relations, and performance management.'
		}
	];

	async function change() {
		job = !job;
	}

	let jobCandidates = [
		{ name: 'John Doe', skills: ['JavaScript', 'React', 'Node.js'] },
		{ name: 'Jane Smith', skills: ['Python', 'Django', 'Machine Learning'] },
		{ name: 'Bob Johnson', skills: ['Java', 'Spring Boot', 'Microservices'] },
		{ name: 'Alice Williams', skills: ['C#', '.NET', 'Azure'] }
	];
</script>

<div class="container mx-auto px-4">
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={change}>Change</button
	>
	{#if job}
		<h1 class="text-4xl font-bold mb-4">Company</h1>
		{#each jobs as job}
			<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
				<div class="mb-4">
					<span class="block text-gray-700 text-sm font-bold mb-2">Current job Listing</span>
					<p class="text-gray-700 text-base">{job.title}</p>
				</div>
				<div class="mb-4">
					<span class="block text-gray-700 text-sm font-bold mb-2">Job candidates</span>
					<p class="text-gray-700 text-base">{jobCandidates[1].name}</p>
					<p class="text-gray-700 text-base">{jobCandidates[1].skills}</p>
				</div>
			</div>
		{/each}
	{/if}
	{#if !job}
		<div class="px-24 pb-16">
			<h1 class="text-4xl font-bold mb-4">User</h1>
			<h2 class="text-2xl font-bold mb-4">Optimize your applications</h2>
			<h3 class="text-xl font-bold mb-2">Your applications</h3>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
			/>
			<h3 class="text-xl font-bold mb-2">The job description</h3>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
			/>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
				>Do</button
			>
		</div>
		<div>
			{#each jobs as job}
				<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
					<div class="mb-4">
						<span class="block text-gray-700 text-sm font-bold mb-2">Job Title</span>
						<p class="text-gray-700 text-base">{job.title}</p>
					</div>
					<div class="mb-4">
						<span class="block text-gray-700 text-sm font-bold mb-2">Job Description</span>
						<p class="text-gray-700 text-base">{job.description}</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
