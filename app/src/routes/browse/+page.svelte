<script>
  import Browse from '$lib/components/Browse.svelte';
  import BrowseCompany from '$lib/components/company/Browse.svelte';
  export let data;

  const user = data.user;
</script>

{#if user.company}
  <BrowseCompany {data} />
{:else}
  <Browse {data} />
{/if}
