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
    class="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg sm:p-10"
  >
    <h1 class="text-3xl font-bold mb-6 text-center">Add Entry</h1>

    <div class="flex flex-col gap-4">
      <input
        class="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Title"
        bind:value={title}
      />

      <textarea
        class="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Description"
        bind:value={description}
        rows="4"
      ></textarea>

      <input
        class="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        class="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tags (comma separated)"
        bind:value={tags}
      />

      <button
        type="submit"
        class="bg-blue-600 text-white font-semibold rounded-md p-3 mt-4 hover:bg-blue-700 transition-colors"
      >
        Add Entry
      </button>
    </div>
  </form>
</div>