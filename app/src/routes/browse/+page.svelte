<script>
  import { goto } from '$app/navigation';
  import { marked } from 'marked';

  import Card from '$lib/components/Card.svelte';

  export let data;

  let jobListings = data.jobListings;

  function navigateToCompany(id) {
    goto(`/companies/${id}`);
  }

  function navigateToJobListing(id) {
    goto(`/job-listings/${id}`);
  }

  let selectedJobListing = jobListings[0];
  selectJobListing(selectedJobListing._id);

  function selectJobListing(id) {
    jobListings = jobListings.map((l) => {
      if (l._id === id) {
        selectedJobListing = l;
        l.active = true;
      } else {
        l.active = false;
      }
      return l;
    });
  }
</script>

<h1 class="text-center text-2xl text-indigo-700 font-bold">Browse Job Listings</h1>

<div class="flex gap-2 p-10">
  <div class="flex flex-col gap-2 max-h-96 overflow-y-scroll p-5 bg-gray-50 rounded w-1/3">
    {#each jobListings as jobListing}
      <div
        on:click={selectJobListing(jobListing._id)}
        class="rounded {jobListing.active
          ? ' border border border-indigo-700'
          : ''} flex-grow hover:scale-105 transition ease-in-out"
      >
        <Card
          props={{
            ...{
              title: jobListing.title,
              subtitle: jobListing.company.name,
              tags: jobListing.tags
            }
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

  <div class="rounded shadow-lg flex-grow p-3 w-1/2">
    <article class="prose">
      {@html marked.parse(selectedJobListing.description || '')}
    </article>
  </div>
</div>
