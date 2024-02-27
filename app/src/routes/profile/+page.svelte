<script lang="ts">
	import { invalidateAll } from '$app/navigation';


	export let data;

	let selectedFile: File | null = null;

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			selectedFile = input.files[0];
		}
	}

	async function handleoploadfiles(e: Event) {
		let reader = new FileReader();
		reader.onloadend = async function () {
			let base64data = reader.result;
			const payload = {
				title: selectedFile?.name,
				encoded: base64data,
				token: data.token
			};

			await fetch('/api/profile/documents', {
				method: 'POST',
				body: JSON.stringify(payload)
			});
			
		};
		reader.readAsDataURL(selectedFile as File);
		invalidateAll;
	}

	function handleRemoveFile(id) {

    const payload = {
      id: id,
      token: data.token
    }

		return async () => {
			await fetch(`/api/profile/documents`, {
				method: 'DELETE',
        body: JSON.stringify(payload)
			});
		};
	}

	const user = data.user;
</script>

<main class="flex flex-col items-center py-6 sm:py-12">
	<div class="p-6 bg-white rounded shadow-md w-full max-w-md">
		<h1 class="text-2xl font-bold mb-4">{user.name}</h1>
		<p class="mb-2"><span class="font-bold">Email:</span> {user.email}</p>
		{#if data.profile.bio != undefined}
			<p class="mb-0.5"><span class="font-bold">Bio:</span> {data.profile.bio}</p>
		{/if}
	</div>
	<div class="p-6 bg-white rounded shadow-md w-full max-w-md">
		<h1 class="text-2xl font-bold mb-4">Your Documents</h1>
		<table class="w-full text-left border-collapse">
			<thead>
				<tr>
					<th
						class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
						>File Name</th
					>
				</tr>
			</thead>
			<tbody>
				{#each data.profile.documents as document}
					<tr class="hover:bg-grey-lighter">
						<td class="py-4 px-6 border-b border-grey-light">{document.title}</td>
						<td class="py-4 px-6 border-b border-grey-light">
							<button
								class="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
								on:click={handleRemoveFile(document._id)}
							>
								Remove
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<form
			class="flex flex-col"
			method="POST"
			enctype="multipart/form-data"
			on:submit|preventDefault={handleoploadfiles}
		>
			<div class="mt-4">
				<input
					type="file"
					accept=".pdf,.doc,.docx"
					on:change={handleFileChange}
					class="p-2 border rounded"
				/>
				<button
					type="submit"
					class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>Upload</button
				>
			</div>
		</form>
	</div>
</main>
