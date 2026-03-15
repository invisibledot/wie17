<script>
  import "../app.css";
  let menuOpen = false;
</script>

<div class="min-h-screen flex flex-col bg-gray-50">
  <!-- Navbar -->
  <nav class="bg-white shadow-md sticky top-0 z-50 relative px-6 py-4 flex justify-between items-center">
    <div class="text-2xl font-bold text-gray-800">Wie17 test</div>

    <!-- Desktop links -->
    <div class="hidden sm:flex gap-6">
      <a href="/" class="text-gray-800 font-medium hover:text-blue-600 transition-colors">Gallery</a>
      <a href="/add" class="text-gray-800 font-medium hover:text-blue-600 transition-colors">Add Entry</a>
    </div>

    <!-- Hamburger -->
    <button class="sm:hidden text-gray-800 focus:outline-none" on:click={() => menuOpen = !menuOpen}>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
      </svg>
    </button>

    <!-- Mobile links -->
    {#if menuOpen}
      <div class="sm:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-4 px-6 py-4 z-50">
        <a href="/" class="text-gray-800 font-medium hover:text-blue-600 transition-colors">Gallery</a>
        <a href="/add" class="text-gray-800 font-medium hover:text-blue-600 transition-colors">Add Entry</a>
      </div>
    {/if}
  </nav>

  <!-- Page content -->
  <main class="flex-1 p-4 sm:p-6">
    <slot />
  </main>
</div>