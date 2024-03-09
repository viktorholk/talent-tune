<script>
  import { goto } from '$app/navigation';
  import { marked } from 'marked';
  import _ from 'lodash';
  import { writable } from 'svelte/store';
  import Card from '$lib/components/Card.svelte';

  export let data;

  const initialJobListings = _.cloneDeep(data.jobListings);
  let jobListingsStore = writable(initialJobListings);

  let selectedJobListingStore = writable(null);

  function selectFirst() {
    jobListingsStore.update((l) => {
      return l.map((i, j) => {
        if (j == 0) i.active = true;
        else i.active = false;

        return i;
      });
    });
  }

  function navigateToCompany(id) {
    goto(`/companies/${id}`);
  }

  function navigateToJobListing(id) {
    goto(`/job-listings/${id}`);
  }

  function selectJobListing(id) {
    jobListingsStore.update((listings) => {
      return listings.map((l) => ({ ...l, active: l._id === id }));
    });
  }

  async function handleSearch(input) {
    if (input.length > 0) {
      const words = input.trim().split(' ');

      jobListingsStore.set(initialJobListings.slice());

      jobListingsStore.update((listings) =>
        listings.filter((jobListing) =>
          words.every(
            (word) =>
              jobListing.title.toLowerCase().includes(word.toLowerCase()) ||
              jobListing.company.name.toLowerCase().includes(word.toLowerCase()) ||
              jobListing.tags.some((tag) => tag.toLowerCase().includes(word.toLowerCase()))
          )
        )
      );

      selectFirst();
    } else {
      jobListingsStore.set(initialJobListings.slice());
    }
  }

  selectFirst();

  $: searchFilter = '';
  $: handleSearch(searchFilter);
  $: selectedJobListingStore.set($jobListingsStore.find((l) => l.active));
</script>

<h1 class="text-center text-2xl text-indigo-700 font-bold">Browse Job Listings</h1>

<div class="flex flex-col sm:flex-row gap-2 p-10">
  <div
    class="flex sm:flex-col gap-2 overflow-y-scroll p-3 bg-gray-50 rounded shadow-inner"
    style="max-height: 34rem;"
  >
    <div class="flex items-center rounded border border-gray-300 p-1 hidden sm:flex min-w-64">
      <svg
        class="w-3 h-3 text-gray-400 ml-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      <input
        type="search"
        class="w-full px-2 focus:outline-none text-xs border-none bg-transparent"
        placeholder="Search title, description and tags"
        bind:value={searchFilter}
      />
    </div>

    <div class="border border-gray-300 hidden sm:block"></div>

    <div class="flex flex-col gap-2 w-full">
      <div class="flex items-center rounded border border-gray-300 p-1 w-64 sm:hidden">
        <svg
          class="w-3 h-3 text-gray-400 ml-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          type="search"
          class="w-full px-2 focus:outline-none text-xs border-none bg-transparent"
          placeholder="Search title, description and tags"
          bind:value={searchFilter}
        />
      </div>

      <div class="border border-gray-300 sm:hidden"></div>

      <div class="w-full shadow-inner overflow-x-scroll">

      <div class="flex flex-row sm:flex-col gap-1 p-3">
        {#each $jobListingsStore as jobListing (jobListing._id)}
          <div
            on:click={selectJobListing(jobListing._id)}
            class="min-w-64 rounded {jobListing.active
              ? ' border border border-indigo-700'
              : ''} flex-grow hover:scale-105 transition ease-in-out"
          >
            <Card
              props={{
                title: jobListing.title,
                subtitle: jobListing.company.name,
                tags: jobListing.tags
              }}
            >
              <div class="w-8 hover:scale-110" on:click={navigateToJobListing(jobListing._id)}>
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
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </div>
            </Card>
          </div>
        {/each}
      </div>
      </div>


    </div>
  </div>

  <div class="rounded shadow-lg flex-grow p-3 min-h-96">
    <article class="prose">
      {@html marked.parse($selectedJobListingStore?.description || '#### Select a job listing')}
    </article>
  </div>
</div>
