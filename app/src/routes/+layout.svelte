<script>
	import { page } from '$app/stores';
	let job = true;
</script>

<head> </head>
<body>
	{#if $page.url.pathname != '/login' && $page.url.pathname != '/register'}
		{#if !job}
			<nav>
				<a href="/">Dashboard</a>
				<a href="/user/documents">Documents</a>
				<a href="/user/profile">Profile</a>
				<a href="/login">Logout</a>
			</nav>
		{/if}
		{#if job}
			<nav>
				<a href="/">Dashboard</a>
				<a href="/company/applications">Applications</a>
				<a href="/company/profile">Profile</a>
				<a href="/login">Logout</a>
			</nav>
		{/if}
	{/if}
	<main>
		<slot />
	</main>
</body>
