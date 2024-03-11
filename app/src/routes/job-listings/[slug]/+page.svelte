<script>
  export let data;

  import Modal from '$lib/components/Modal.svelte';

  import { marked } from 'marked';
  import { goto } from '$app/navigation';
  import _ from 'lodash';

  let listing = data.jobListing;

  let isEditable = data.user.company?._id === listing.company._id;

  let showModal = false;

  let editing = false;
  let editingTitle = listing.title;
  let editingDescription = listing.description;
  let editingTags = listing.tags.join(', ');

  const deleteJobListing = async () => {
    const response = await fetch('/api/job-listings/', {
      method: 'DELETE',
      body: JSON.stringify({ id: listing._id, token: data.token })
    });

    if (response.ok) {
      showModal = false;
      goto('/');
    }
  };

  const toggleEditing = async () => {
    if (editing) {
      const payload = {
        id: listing._id,
        token: data.token,
        title: editingTitle,
        description: editingDescription,
        tags: editingTags.split(', ')
      };

      const response = await fetch('/api/job-listings/', {
        method: 'PATCH',
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        listing.title = editingTitle;
        listing.description = editingDescription;
        listing.tags = editingTags.split(', ');
      }
    }

    editing = !editing;
  };
</script>

<Modal bind:showModal actionFunction={deleteJobListing}>
  <h1>Are you sure you want to delete this job listing?</h1>
  <h2 class="text-center text-xl text-indigo-500 font-bold">{listing.title}</h2>
</Modal>

<div class="flex flex-col">
  <div class="p-6 bg-white rounded shadow-md border border-gray-200 m-2">
    <div class="flex justify-between">
      {#if editing}
        <input
          type="text"
          class="bg-gray-100 rounded p-1 max-w-xl w-full"
          placeholder="Title"
          bind:value={editingTitle}
        />
      {:else}
        <h1 class="text-2xl font-black text-indigo-600 max-w-xl">{listing.title}</h1>
      {/if}

      {#if isEditable}
        <div class="flex gap-4">
          <div
            class="text-gray-500 hover:scale-110 hover:cursor-pointer hover:text-black transition ease-in-out"
            on:click={() => toggleEditing()}
          >
            {#if editing}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            {/if}
          </div>

          <div
            class="text-gray-500 hover:scale-110 hover:cursor-pointer hover:text-black transition ease-in-out"
            on:click={() => (showModal = true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      {/if}
    </div>

    <div class="border-5 border-gray-400 border-b-2 mb-5"></div>

    {#if editing}
      <textarea
        class="bg-gray-100 rounded p-1 min-h-96 w-full"
        placeholder="Description"
        bind:value={editingDescription}
      />
    {:else}
      <article class="prose">
        {@html marked.parse(listing.description || '')}
      </article>
    {/if}
    <div class="p-1 mt-5">
      {#if editing}
        <input
          type="text"
          class="bg-gray-100 rounded p-1 w-full"
          placeholder="Tags (Comma seperated)"
          bind:value={editingTags}
        />
      {:else}
        {#each listing.tags as tag}
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
            >{tag}</span
          >
        {/each}
      {/if}
    </div>

    <div class="flex justify-end">
      <a
        href="/companies/{listing.company._id}"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-3 rounded mb-2 text-xs"
      >
        About the Company
      </a>
    </div>
  </div>
</div>
