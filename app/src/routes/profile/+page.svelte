<script lang="ts">
	import { invalidateAll } from '$app/navigation';


	export let data;

	const user = data.user;

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
		invalidateAll();
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

  // User settings
  let editingName = user.name;
  let editingEmail = user.email;
  let editingPassword= "";




  let openTab = 0;
  function toggleTabs(tab) {
    openTab = tab;
  }

</script>

<main class="flex flex-col items-center py-6 sm:py-12">

	<div class="p-6 bg-white rounded shadow-md w-full max-w-md">

<div class="flex justify-center">

<div class="inline-flex border-5 border-b rounded-xl mb-5">
<div
      class="px-4 py-2 cursor-pointer  rounded-l {openTab === 0  ? 'border-5 border-b border-indigo-600 font-semibold' : ''}"
      on:click={() => toggleTabs(0)}
    >
    {user.company ? 'Company' : 'Profile'}
    </div>
    <div
      class="px-4 py-2 cursor-pointer  rounded-r {openTab === 1  ? 'border-5 border-b border-indigo-600 font-semibold' : ''}"
      on:click={() => toggleTabs(1)}
    >
      User
    </div>
</div>

</div>


{#if openTab === 0}

{#if user.company}


{:else}


{/if}


{:else}
<div class="flex flex-col gap-2">
  <div class="flex justify-between items-center">
  <label class="font-bold w-24">Name</label>
  <input type="text" class="bg-gray-100 flex-grow h-8 p-2 rounded text-xl" bind:value={editingName}/>
  </div>

  <div class="flex justify-between  items-center">
  <label class="font-bold w-24">Email</label>
  <input type="email" class="bg-gray-100 flex-grow h-8 p-2 rounded text-xl" bind:value={editingEmail}/>
  </div>

<div class="flex justify-between  items-center">
  <label class="font-bold w-24">Password</label>
  <input type="email" class="bg-gray-100 flex-grow h-8 p-2 rounded text-xl" placeholder="**********" bind:value={editingPassword}/>
  </div>

  <div class="flex justify-end">
  <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full" >Save</button>
  </div>
</div>

{/if}






  {#if !user.company}
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
  {/if}
</main>
