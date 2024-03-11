<script>
  import Avatar from '$lib/components/Avatar.svelte';
  export let data;
  const profile = data.profile.data;
</script>

<div class="flex justify-center">
  <div class="shadow-xl w-96 flex justify-center flex-col items-center p-3 gap-4">
    <Avatar size={36} srcImage={profile?.picture} />

    <div>
      <h1 class="text-center text-xl font-semibold p-1">
        {profile.firstName || ''}
        {profile.lastName || ''}
      </h1>
      <p class="max-w-96 text-sm italic">{profile.bio || ''}</p>
    </div>

    <div>
      {#each profile.tags as tag}
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
          >{tag}</span
        >
      {/each}
    </div>

    <div>
      <h2 class="font-bold text-sm">Documents</h2>

      <table class="w-full text-left border-collapse">
        <tbody>
          {#each profile?.documents || [] as doc}
            <tr class="">
              <td class="border-b border-grey-light">
                <a href={`/documents/${doc._id}`} class="text-blue-500 hover:underline"
                  >{doc.title}</a
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
