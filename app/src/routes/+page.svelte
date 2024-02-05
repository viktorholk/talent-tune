<script>
	let job = true;
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

<ul>
	<button on:click={change}>change</button>
	{#if job}
		<h1>company</h1>
		{#each jobs as job}
			<table>
				<tr>
					<th>Current job Listing</th>
					<th>Job candidates</th>
				</tr>
				<tr>
					<td>{job.title}</td>
					<td>{jobCandidates[1].name}</td>
					<td>{jobCandidates[1].skills}</td>
				</tr>
			</table>
		{/each}
	{/if}
	{#if !job}
		<div style="padding-left: 6rem; padding-bottom: 4rem;">
			<h1>User</h1>
			<h2>Optimize your applications</h2>
			<h3>Your applications</h3>
			<input type="text" />
			<h3>The job description</h3>
			<input type="text" />
			<button>do</button>
		</div>
		<div>
			{#each jobs as job}
				<table>
					<tr>
						<th>Job Title</th>
						<th>Job Description</th>
					</tr>
					<tr>
						<td>{job.title}</td>
						<td>{job.description}</td>
					</tr>
				</table>
			{/each}
		</div>
	{/if}
</ul>
