<script>
import { supabase } from '$lib/supabase'

let title = ''
let description = ''
let image_url = ''
let tags = ''

async function submit() {
  const { error } = await supabase
    .from('entries')
    .insert({
      title,
      description,
      image_url,
      tags: tags.split(',').map(t => t.trim())
    })

  if (error) {
    alert(error.message)
  } else {
    window.location.href = '/'
  }
}
</script>

<div class="flex justify-center mt-10 px-4">
  <form
    on:submit|preventDefault={submit}
    class="w-full max-w-lg bg-blue p-8 rounded-xl shadow-lg sm:p-10"
  >
    <h1 class="text-3xl font-bold mb-6 text-center text-yellow">Add Entry</h1>

    <div class="flex flex-col gap-4">
      <input
        class="text-blue bg-white border border-orange rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink"
        placeholder="Title"
        bind:value={title}
      />

      <textarea
        class="text-blue bg-white border border-orange rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink resize-none"
        placeholder="Description"
        bind:value={description}
        rows="4"
      ></textarea>

      <input
        class="text-blue bg-white border border-orange rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink"
        placeholder="Image URL"
        bind:value={image_url}
      />

      <!-- Live Image Preview -->
      {#if image_url}
        <img
          src={image_url}
          alt="Preview"
          class="rounded-md border border-gray-300 mt-2 max-h-60 object-contain"
        />
      {/if}

      <input
        class="text-blue bg-white border border-orange rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink"
        placeholder="Tags (comma separated)"
        bind:value={tags}
      />

      <button
        type="submit"
        class="bg-pink text-palepink font-semibold rounded-md p-3 mt-4 hover:bg-yellow hover:text-blue transition-colors"
      >
        Add Entry
      </button>
    </div>
  </form>
</div>