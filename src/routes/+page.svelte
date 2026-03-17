<script>
  import GalleryView from '$lib/components/GalleryView.svelte'
  export let data

  let currentView = 'gallery'
</script>

<div class="view-switcher">
  <button on:click={() => currentView = 'gallery'}>
    Gallery
  </button>
  <button on:click={() => currentView = 'map'}>
    Map
  </button>
</div>

{#if currentView === 'gallery'}
  <GalleryView entries={data.entries} />
{:else}
  <div style="padding:40px; text-align:center;">
    Map view coming next…
  </div>
{/if}

<style>
.view-switcher{
  display:flex;
  gap:10px;
  padding:20px;
}
button{
  padding:8px 16px;
}
</style>