<script>
	export let data;

	const user = data.user;
</script>

<main class="flex flex-col items-center py-6 sm:py-12">
	<div class="p-6 bg-white rounded shadow-md w-full max-w-md">
		<h1 class="text-2xl font-bold mb-4">{user.name}</h1>
		<p class="mb-2"><span class="font-bold">Email:</span> {user.email}</p>
	</div>
</main>
