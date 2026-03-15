<script>
  export let data;
</script>

<h1 class="text-3xl font-bold mb-6">Entries</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {#each data.entries as entry}
    <div class="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      {#if entry.image_url}
        <img 
          src={entry.image_url} 
          alt={entry.title} 
          class="w-full h-48 object-cover rounded-md mb-4"
        />
      {/if}
      <h3 class="text-xl font-semibold mb-2">{entry.title}</h3>
      <p class="text-gray-700">{entry.description}</p>
    </div>
  {/each}
</div>