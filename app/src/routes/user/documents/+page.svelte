<script lang="ts">
	import { onMount } from 'svelte';

	let selectedFile: File | null = null;

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			selectedFile = input.files[0];
		}
	}

	function handleUpload() {
		if (selectedFile) {
			// Perform upload logic here
			console.log('Uploading file:', selectedFile.name);
		}
	}

	onMount(() => {
		// Additional initialization logic here
	});
</script>

<main class="flex flex-col items-center py-6 sm:py-12">
	<div class="p-6 bg-white rounded shadow-md w-full max-w-md">
		<h1 class="text-2xl font-bold mb-4">Your Documents</h1>
		<table class="w-full text-left border-collapse">
			<thead>
				<tr>
					<th
						class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
						>File Name</th
					>
					<th
						class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
						>File Size</th
					>
				</tr>
			</thead>
			<tbody>
				<tr class="hover:bg-grey-lighter">
					<td class="py-4 px-6 border-b border-grey-light">example.pdf</td>
					<td class="py-4 px-6 border-b border-grey-light">1.2 MB</td>
				</tr>
				<tr class="hover:bg-grey-lighter">
					<td class="py-4 px-6 border-b border-grey-light">example.docx</td>
					<td class="py-4 px-6 border-b border-grey-light">0.8 MB</td>
				</tr>
			</tbody>
		</table>
		<div class="mt-4">
			<input
				type="file"
				accept=".pdf,.doc,.docx"
				on:change={handleFileChange}
				class="p-2 border rounded"
			/>
			<button
				on:click={handleUpload}
				class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>Upload</button
			>
		</div>
	</div>
</main>
