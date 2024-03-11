<script>
  import defaultIcon from '$lib/assets/default-profile-picture.jpg';

  export let srcImage = undefined;
  export let size = 24;
</script>

<div class="w-{size} h-{size} rounded-3xl overflow-hidden">
  <img class="w-full" src={srcImage || defaultIcon} alt="Avatar" />
</div>
