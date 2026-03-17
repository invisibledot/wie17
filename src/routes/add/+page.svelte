<script>
import { supabase } from '$lib/supabase'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

let title = ''
let description = ''
let tags = ''
let files = []       // selected files
let previews = []    // previews
let uploading = false
let location_lat = null
let location_lng = null
let locating = false

async function submit() {
  if (!files.length) {
    alert("Please select at least one image.")
    return
  }

  uploading = true

  try {
    // Upload images in parallel
    const uploadPromises = files.map(async file => {
      const resizedFile = await resizeImage(file)
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`

      const { error } = await supabase.storage.from('images').upload(fileName, resizedFile)
      if (error) throw error

      const { data } = supabase.storage.from('images').getPublicUrl(fileName)
      return encodeURI(data.publicUrl)
    })

    const image_urls = (await Promise.all(uploadPromises)).filter(Boolean)

    console.log('Submitting entry with:', {
      title,
      description,
      image_urls,
      tags,
      location_lat,
      location_lng
    })

    const { data, error } = await supabase
      .from('entries')
      .insert({
        title,
        description,
        image_urls,                  // ✅ text[]
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        location_lat,
        location_lng
      })
      .select()  // returns the inserted row

    if (error) throw error

    console.log('Insert result:', data)
    window.location.href = '/'
  } catch (err) {
    alert(err.message)
  } finally {
    uploading = false
  }
}

async function resizeImage(file, maxWidth = 1600, quality = 0.8) {
  return new Promise(resolve => {
    const img = new Image()
    const reader = new FileReader()
    reader.onload = e => img.src = e.target.result
    img.onload = () => {
      const scale = Math.min(maxWidth / img.width, 1)
      const canvas = document.createElement('canvas')
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => resolve(new File([blob], file.name, { type: 'image/jpeg' })), 'image/jpeg', quality)
    }
    reader.readAsDataURL(file)
  })
}

function useMyLocation() {
  if (!navigator.geolocation) return alert('Geolocation not supported')

  locating = true
  navigator.geolocation.getCurrentPosition(
    pos => {
      location_lat = pos.coords.latitude
      location_lng = pos.coords.longitude
      locating = false
    },
    () => { alert('Unable to retrieve location'); locating = false }
  )
}

function handleFileChange(e) {
  const selectedFiles = Array.from(e.target.files)
  const validFiles = []
  const previewUrls = []

  for (const file of selectedFiles) {
    if (!file.type.startsWith('image/')) { alert(`"${file.name}" is not an image.`); continue }
    if (file.size > MAX_FILE_SIZE) { alert(`"${file.name}" exceeds 5MB.`); continue }
    validFiles.push(file)
    previewUrls.push(URL.createObjectURL(file))
  }

  files = validFiles
  previews = previewUrls
}
</script>

<div class="flex justify-center mt-10 px-4">
  <form on:submit|preventDefault={submit} class="w-full max-w-lg bg-zinc-200 p-8 rounded-xl">
    <h1 class="text-3xl font-bold mb-6 text-center text-zinc-900">Add Entry</h1>

    <div class="flex flex-col gap-4">
      <input placeholder="Title" bind:value={title} class="text-zinc-900 bg-white border border-zinc-900 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink" />
      <textarea placeholder="Description" bind:value={description} rows="4" class="text-zinc-900 bg-white border border-zinc-900 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink resize-none"></textarea>

      <input type="file" accept="image/*" multiple on:change={handleFileChange} />
      <p class="text-sm text-zinc-500">Max file size per image: 5MB</p>

      {#if previews.length}
        <div class="flex gap-2 flex-wrap mt-2">
          {#each previews as preview}
            <img src={preview} alt="Preview" class="rounded-md border border-zinc-900 max-h-60 object-contain" />
          {/each}
        </div>
      {/if}

      <input placeholder="Tags (comma separated)" bind:value={tags} class="text-zinc-900 bg-white border border-zinc-900 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink" />

      <div class="flex flex-col gap-2 mt-4">
        <label class="text-sm font-semibold">Location (optional)</label>
        <button type="button" on:click={useMyLocation} class="bg-zinc-100 rounded-md p-2 text-sm">{locating ? 'Getting location...' : 'Use My Location'}</button>
        <input type="number" step="any" placeholder="Latitude" bind:value={location_lat} class="border rounded-md p-2" />
        <input type="number" step="any" placeholder="Longitude" bind:value={location_lng} class="border rounded-md p-2" />
      </div>

      <button type="submit" class="bg-zinc-500 text-zinc-100 font-semibold rounded-md p-3 mt-4 hover:bg-zinc-100 hover:text-zinc-900 transition-colors">{uploading ? 'Uploading...' : 'Add Entry'}</button>
    </div>
  </form>
</div>