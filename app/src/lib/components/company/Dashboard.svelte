<script>
  import { post } from '$lib/actions/fetching';
  import { goto } from '$app/navigation';

  import { onMount } from 'svelte';

  import Card from '$lib/components/Card.svelte';

  export let data;

  let user = data.user;
  let listings = data.jobListings;

  // Get the job listings associated to the user
  const handleCreateJobListing = async (e) => {
    const formData = new FormData(e.target);

    const payload = {
      title: formData.get('title'),
      description: formData.get('description'),
      tags: formData.get('tags').split(','),
      token: data.token
    };

    const response = await fetch('/api/job-listings', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (response.status === 201) {
      // Navigate to the newly created job listing
      const newListing = await response.json();

      goto(`/job-listings/${newListing._id}`);
    }
  };
  function navigateToJobListing(id) {
    goto(`/job-listings/${id}`);
  }
</script>

<div class="flex gap-2">
  <div class="flex-grow">
    <h1 class="text-center font-bold text-indigo-600 text-2xl">Create Job Listing</h1>
    <form
      class="flex flex-col"
      method="POST"
      enctype="multipart/form-data"
      on:submit|preventDefault={handleCreateJobListing}
    >
      <label for="title" class="font-bold text-black">Title</label>
      <input
        id="title"
        name="title"
        class="w-full p-2 mb-4 border border-gray-300 rounded-md"
        placeholder=""
        required
      />

      <label for="description" class="font-bold text-black">Description</label>
      <textarea
        id="description"
        name="description"
        class="w-full min-h-64 p-2 mb-4 border border-gray-300 rounded-md"
        placeholder=""
        required
      ></textarea>

      <label for="tags" class="font-bold text-black">Tags (comma seperated)</label>
      <input
        id="tags"
        name="tags"
        class="w-full p-2 mb-4 border border-gray-300 rounded-md"
        placeholder="tag1,tag2,tag3"
      />

      <div class="flex justify-center">
        <button
          type="submit"
          class="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full"
        >
          Create
        </button>
      </div>
    </form>
  </div>

  <div class="w-1/3 px-5">
    <h3 class="text-center text-indigo-700">Your Job Listings ({listings.length})</h3>

    {#each listings as jobListing}
      <div
        class="rounded flex-grow hover:scale-105 transition ease-in-out mb-5"
        on:click={() => navigateToJobListing(jobListing._id)}
      >
        <Card
          props={{
            ...{
              title: jobListing.title,
              tags: jobListing.tags
            }
          }}
        >
          <div class="flex p-1 gap-1"></div>
        </Card>
      </div>
    {/each}
  </div>
</div>
