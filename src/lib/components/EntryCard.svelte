<script>
  export let entry

  // Resolve URLs: prefer multi-image, fallback to single
  const urls = entry.image_urls?.length ? entry.image_urls : entry.image_url ? [entry.image_url] : []

  console.log('Entry received:', entry)
  console.log('Resolved URLs:', urls)
</script>

<div class="bg-white p-4 rounded-lg border border-zinc-300 hover:border-zinc-500 hover:bg-zinc-200">
  {#if urls.length}
    <div class="flex flex-wrap gap-2 mb-2">
      {#each urls as url, i}
        <img
          src={url}
          alt={`Image ${i + 1}`}
          loading="lazy"
          class="flex-1 min-w-[48%] max-h-36 object-cover rounded-md"
        />
      {/each}
    </div>
  {/if}

  <h3 class="text-lg font-semibold">{entry.title}</h3>
  <p class="text-zinc-700">{entry.description}</p>

  {#if entry.location_lat && entry.location_lng}
    <p class="text-xs text-zinc-500 mt-1">
      📍 {entry.location_lat.toFixed(4)}, {entry.location_lng.toFixed(4)}
    </p>
  {/if}
</div>