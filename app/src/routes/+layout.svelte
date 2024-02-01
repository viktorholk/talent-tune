<script>

	import { page } from '$app/stores';
</script>

<head>

</head>
<body>
	{#if $page.url.pathname != '/login'}
		<nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/company">company</a>
            <a href="/user">user</a>
            <a href="/login">Logout</a>
        </nav>              
	{/if}
	<main>
		<slot />
	</main>
</body>
