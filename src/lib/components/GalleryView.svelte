<script>
  import EntryCard from './EntryCard.svelte'
  export let entries
</script>

<div class="grid">
  {#each entries as entry}
    <EntryCard {entry} />
  {/each}
</div>

<style>
.grid{
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap:16px;
  padding:20px;
}
</style>