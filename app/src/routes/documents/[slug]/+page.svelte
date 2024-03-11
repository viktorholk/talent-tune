<script>
  export let data;

  const doc = data.document;
</script>

<h1 class="text-center text-indigo-700 font-bold">{doc.title}</h1>

<div class="container mx-auto shadow-xl">
  <div class="p-5 shadow-2xl">
    <embed src={doc.encoded} width="800px" height="1200px" />
  </div>
</div>
