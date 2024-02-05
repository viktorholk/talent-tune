<script>
  // Import any necessary dependencies here

  let jobTitle = "";
  let jobDescription = "";

  function createJobListing() {
    // Implement the logic to create a new job listing here
    // You can use the jobTitle and jobDescription variables to access the user input
  }
</script>

<main>
  <h1>Create New Job Listing</h1>

  <form on:submit|preventDefault={createJobListing}>
    <label for="jobTitle">Job Title:</label>
    <input type="text" id="jobTitle" bind:value={jobTitle} />

    <label for="jobDescription">Job Description:</label>
    <textarea id="jobDescription" bind:value={jobDescription}></textarea>

    <button type="submit">Create</button>
  </form>
</main>

<style>
  /* Add any necessary styles here */
</style>
