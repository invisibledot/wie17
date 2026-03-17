<script>
  export let data;
</script>

<h1 class="text-3xl font-bold mb-6 text-black">The Pub</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {#each data.entries as entry}
    <div class="bg-white rounded-lg p-4 border border-blue-0 hover:border-blue hover:bg-blue-00">
      {#if entry.image_url}
        <img 
          src={entry.image_url} 
          alt={entry.title} 
          class="w-full h-48 object-cover rounded-md border border-blue-0 mb-4"
        />
      {/if}
      <h3 class="text-xl font-semibold mb-2 text-blue">{entry.title}</h3>
      <p class="text-blue">{entry.description}</p>
    </div>
  {/each}
</div>