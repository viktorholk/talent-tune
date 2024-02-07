<script>
	import '../app.css';
	import { page } from '$app/stores';
	let job = false;
	import icon from '../../static/talenttuneicon.svg?raw';
</script>

<head> </head>
<body>
	{#if $page.url.pathname != '/login' && $page.url.pathname != '/register'}
		{#if !job}
			<nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6 mb-4">
				<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
					<div class="text-sm lg:flex-grow">
						<a
							href="/"
							class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
						>
							<div class="w-12 h-12">
								{@html icon}
							</div>
						</a>
						<a
							href="/user/documents"
							class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 text-center text-lg"
						>
							Documents
						</a>
						<a
							href="/user/profile"
							class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white text-center text-lg"
						>
							Profile
						</a>
					</div>
					<div>
						<a
							href="/login"
							class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
						>
							Logout
						</a>
					</div>
				</div>
			</nav>
		{/if}
		{#if job}
			<nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6 mb-4">
				<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
					<div class="text-sm lg:flex-grow">
						<a
							href="/"
							class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
						>
							<div class="w-12 h-12">
								{@html icon}
							</div>
						</a>
						<a
							href="/company/applications"
							class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 text-center text-lg"
						>
							Applications
						</a>
						<a
							href="/company/profile"
							class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white text-center text-lg"
						>
							Profile
						</a>
					</div>
					<div>
						<a
							href="/login"
							class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
						>
							Logout
						</a>
					</div>
				</div>
			</nav>
		{/if}
	{/if}
	<main>
		<slot />
	</main>
</body>
