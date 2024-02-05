<script lang="ts">
  import { onMount } from 'svelte';

  let selectedFile: File | null = null;

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      selectedFile = input.files[0];
    }
  }

  function handleUpload() {
    if (selectedFile) {
      // Perform upload logic here
      console.log('Uploading file:', selectedFile.name);
    }
  }

  onMount(() => {
    // Additional initialization logic here
  });
</script>

<main>
  <h1>Your Documents</h1>
  <table>
    <tr>
      <th>File Name</th>
      <th>File Size</th>
    </tr>
    <tr>
      <td>example.pdf</td>
      <td>1.2 MB</td>
    </tr>
    <tr>
      <td>example.docx</td>
      <td>0.8 MB</td>
    </tr>
  </table>
  <input type="file" accept=".pdf,.doc,.docx" on:change={handleFileChange} />
  <button on:click={handleUpload}>Upload</button>
</main>

<style>
  /* Add your custom styles here */
</style>
