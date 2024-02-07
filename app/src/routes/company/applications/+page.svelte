<script>
  let jobTitle = "";
  let jobDescription = "";

  function createJobListing() {
    // Implement the logic to create a new job listing here
    // You can use the jobTitle and jobDescription variables to access the user input
  }
</script>

<main class="flex flex-col items-center  py-6 sm:py-12">
  <div class="p-6 bg-white rounded shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-4">Create New Job Listing</h1>

    <form on:submit|preventDefault={createJobListing} class="space-y-4">
      <div>
        <label for="jobTitle" class="block text-sm font-medium text-gray-700">Job Title:</label>
        <input type="text" id="jobTitle" bind:value={jobTitle} class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div>
        <label for="jobDescription" class="block text-sm font-medium text-gray-700">Job Description:</label>
        <textarea id="jobDescription" bind:value={jobDescription} class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
      </div>

      <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</button>
    </form>
  </div>
</main>