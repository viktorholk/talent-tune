<script lang="ts">
  import Dashboard from '$lib/components/Dashboard.svelte';
  import CompanyDashboard from '$lib/components/company/Dashboard.svelte';

  export let data;

  let user = data.user;
</script>

<div class="container mx-auto px-4">
	{#if user.company}
  <CompanyDashboard {data}/>
	{:else}
  <Dashboard {data}/>

	{/if}
</div>
