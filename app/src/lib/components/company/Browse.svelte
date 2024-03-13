<script>
  import { onMount } from 'svelte';

  import { writable } from 'svelte/store';
  import Avatar from '../Avatar.svelte';

  export let data;

  let profiles = undefined;
  let profilesStore = writable([]);

  onMount(async () => {
    const res = await fetch('/api/profile/all', {
      method: 'POST',
      body: JSON.stringify({ token: data.token })
    });
    const _data = await res.json();
    profiles = _data.result;
    profilesStore.set(profiles);
  });

  async function handleSearch(input) {
    if (input.length > 0) {
      const words = input.trim().split(' ');

      profilesStore.set(profiles.slice());

      profilesStore.update((profiles) =>
        profiles.filter((profile) =>
          words.every(
            (word) =>
              profile.firstName?.toLowerCase().includes(word.toLowerCase()) ||
              profile.lastName?.toLowerCase().includes(word.toLowerCase()) ||
              profile.bio?.toLowerCase().includes(word.toLowerCase()) ||
              profile.tags?.some((tag) => tag.toLowerCase().includes(word.toLowerCase()))
          )
        )
      );
    } else {
      profilesStore.set(profiles?.slice() || []);
    }
  }

  $: searchFilter = '';
  $: handleSearch(searchFilter);
</script>

<h1 class="text-center text-2xl text-indigo-700 font-bold">Browse Potential applicants</h1>
<div class="mx-auto flex items-center rounded border border-gray-300 p-1 w-96">
  <svg
    class="w-4 h-4 text-gray-400 ml-1"
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
    class="w-full px-2 focus:outline-none text-md border-none bg-transparent"
    placeholder="Search Name, Biography and Tags"
    bind:value={searchFilter}
  />
</div>

{#if $profilesStore?.length === 0}
  <p class="text-center">No applicants found</p>
{:else}
  <div class="flex flex-col justify-center items-center mt-5 gap-3">
    {#each $profilesStore as profile (profile._id)}
      <a href={`/profiles/${profile._id}`}>
        <div
          class="shadow-lg rounded-xl min-h-32 w-96 border border-gray-200 hover:scale-105 cursor-pointer transition ease-in-out"
        >
          <div class="flex h-full">
            <div class="flex items-center">
              <Avatar srcImage={profile.picture} />
            </div>

            <div class="flex flex-col flex-grow p-2">
              <div class="flex-grow">
                <p class="text-xl h-6 font-semibold">
                  {profile.firstName || ''}
                  {profile.lastName || ''}
                </p>

                <p class="text-xs italic p-1">{profile.bio || ''}</p>
              </div>

              <div class="flex justify-end">
                {#each profile.tags as tag}
                  <span
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
                    >{tag}</span
                  >
                {/each}
              </div>
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>
{/if}
