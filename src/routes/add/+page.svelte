<script>
import { supabase } from '$lib/supabase'

let title = ''
let description = ''
let tags = ''
let file = null
let uploading = false
let previewUrl = null   // ✅ preview variable

async function submit() {

  uploading = true

  let image_url = null

  if (file) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (uploadError) {
      alert(uploadError.message)
      uploading = false
      return
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)

    image_url = data.publicUrl
  }

  const { error } = await supabase
    .from('entries')
    .insert({
      title,
      description,
      image_url,
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    })

  uploading = false

  if (error) {
    alert(error.message)
  } else {
    window.location.href = '/'
  }
}

function handleFileChange(e) {
  file = e.target.files[0]

  if (file) {
    previewUrl = URL.createObjectURL(file)   // ✅ local preview
  } else {
    previewUrl = null
  }
}
</script>

<div class="flex justify-center mt-10 px-4">
  <form
    on:submit|preventDefault={submit}
    class="w-full max-w-lg bg-blue p-8 rounded-xl"
  >
    <h1 class="text-3xl font-bold mb-6 text-center text-yellow">Add Entry</h1>

    <div class="flex flex-col gap-4">
      <input
        class="text-blue bg-white border border-blue-11 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink"
        placeholder="Title"
        bind:value={title}
      />

      <textarea
        class="text-blue bg-white border border-blue-11 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink resize-none"
        placeholder="Description"
        bind:value={description}
        rows="4"
      ></textarea>

      <input
        class="text-blue-000"
        type="file"
        accept="image/*"
        on:change={handleFileChange}
      />

      {#if previewUrl}
        <img
          src={previewUrl}
          alt="Preview"
          class="rounded-md border border-blue-11 mt-2 max-h-60 object-contain"
        />
      {/if}

      <input
        class="text-blue bg-white border border-blue-11 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink"
        placeholder="Tags (comma separated)"
        bind:value={tags}
      />

      <button
        type="submit"
        class="bg-blue-0 text-blue font-semibold rounded-md p-3 mt-4 hover:bg-blue-00 hover:text-blue transition-colors"
      >
        Add Entry
      </button>
    </div>
  </form>
</div>