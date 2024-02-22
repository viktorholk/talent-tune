<script>
import { goto } from '$app/navigation';


export let data;

let companies = data.companies;
let jobListings = data.jobListings;

  function toggleTabs(tabNumber) {
    openTab = tabNumber;
  }

	import { onMount } from 'svelte';


let openTab;


	onMount(async () => {



  openTab = 0;

	});


  function navigateToCompany(id) {
    goto(`/companies/${id}`)

  }

</script>



<div class="inline-flex border-5 border-b rounded-xl">
<div
      class="px-4 py-2 cursor-pointer  rounded-l {openTab === 0  ? 'border-5 border-b border-indigo-600 font-semibold' : ''}"
      on:click={() => toggleTabs(0)}
    >
     Job Listings 
    </div>
    <div
      class="px-4 py-2 cursor-pointer  rounded-r {openTab === 1  ? 'border-5 border-b border-indigo-600 font-semibold' : ''}"
      on:click={() => toggleTabs(1)}
    >
      Companies
    </div>
</div>



    
{#if openTab === 0}

<div class="p-5 flex flex-wrap gap-2">
    {#each jobListings as jobListing}

    <a href="/job-listings/{jobListing._id}">
<div class="w-60 max-h-72 overflow-auto rounded  shadow-lg hover:scale-105 transition ease-in-out cursor-pointer">
 <h3 class="text-sm text-gray-400 px-3">{jobListing.companyName}</h3> 
  <div class="px-6 py-4 ">
    <div class="font-bold text-xl mb-2">{jobListing.title}</div>
    <p class="text-gray-700 text-base h-24">
    {jobListing.description.slice(0,100)}
    {#if jobListing.description.length > 100}
    ...
    {/if}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
  {#each jobListing.tags as tag} 

    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
  {/each}
  </div>

</div>
    </a>




    {/each}

</div>
  {:else if openTab === 1}

<table class="table-auto w-full">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>VAT</th>
      <th>Country</th>
      <th>City</th>
      <th>Zip</th>
      <th>Address</th>
      <th>Job Listings Count</th>
    </tr>
  </thead>
  <tbody>

    {#each companies as company}

    <tr class="hover:translate-x-1 hover:cursor-pointer transition ease-in-out" on:click={() => navigateToCompany(company._id)}>
      <td>{company.name}</td>
      <td>{company.description}</td>
      <td>{company.vat}</td>
      <td>{company.country}</td>
      <td>{company.city}</td>
      <td>{company.zip}</td>
      <td>{company.address}</td>
      <td>{company.jobListings.length}</td>
    </tr>

    {/each}

  </tbody>
</table>




  {/if}


