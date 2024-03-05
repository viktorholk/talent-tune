<script>
  export let props = {
    title: '',
    subtitle: '',
    tags: []
  };

  let { title, subtitle, tags } = props;

  tags = tags.filter((tag) => {
    return tag.length > 0;
  });
</script>

<div class="min-w-32 max-w-64 overflow-auto rounded shadow-lg p-1 cursor-pointer">
  <div class="flex items-center">
    <div class="flex flex-grow flex-col">
      <h2 class="text-xl">{title || ''}</h2>
      <h4 class="text-sm text-gray-800">{subtitle || ''}</h4>
    </div>

    <div><slot /></div>
  </div>

  <div>
    <div class="p-1">
      {#each tags as tag}
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
          >{tag}</span
        >
      {/each}
    </div>
  </div>
</div>
