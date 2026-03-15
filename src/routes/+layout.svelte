<script>
  import "../app.css";
  let menuOpen = false;
</script>

<div class="min-h-screen flex flex-col bg-gray-50">
  <!-- Navbar -->
  <nav class="bg-pink shadow-md sticky top-0 z-50 relative px-6 py-4 flex justify-between items-center">
    <!-- Logo: inline SVG instead of image -->
    <a href="/" class="flex items-center">
      <svg
        class="h-10 sm:h-12 text-palepink hover:text-yellow transition-colors"
        viewBox="0 0 48.8 12.6"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Paste all <polygon> and <path> elements from your SVG here -->
        <polygon points="2.8 11.4 0 1.2 1.9 1.2 3.8 8.7 3.9 8.7 5.8 1.2 7.6 1.2 9.6 8.7 9.7 8.7 11.5 1.2 13.5 1.2 10.6 11.4 8.8 11.4 6.8 4.2 6.7 4.2 4.7 11.4 2.8 11.4"/>
        <polygon points="15.4 12.6 15.4 0 19 0 19 1.3 17.1 1.3 17.1 11.2 19 11.2 19 12.6 15.4 12.6"/>
        <path d="M24.3,2.9c-.3,0-.5,0-.8-.3-.1,0-.1-.1-.2-.2s0-.3,0-.4c.1-.2.4-.2.7-.2s.5,0,.6.2.1.3,0,.5-.3.3-.5.4c0,0,.2,0,.2,0Z"/>
        <path d="M22.3,10c0,.2.2.3.4.6.2.2.3.3.5.3h.5c.4-.2.8-.5,1.4-.9.5-.3.8-.5,1.1-.6.2,0,.4,0,.6.3v.3c0,.1-.2.3-.5.5-.4.4-1,.7-1.6,1-.4.2-.9.3-1.4.3s-.9-.2-1.4-.4c-.4-.2-.8-.5-1.1-.9-.4-.5-.6-1.2-.4-2.1,0,0,0-.3.1-.7s.1-.7.2-1c0-.3.1-.5.2-.6,0-.1.2-.2.4-.2h.6c.2,0,.4,0,.6.2.2,0,.3.2.4.4v.5c-.2.4-.3.8-.3.9s-.2.3-.3.6c-.2.2-.3.4-.3.7,0,.5.1.7.3.9,0,0,0-.1,0-.1Z"/>
        <polygon points="31.4 0 31.4 12.6 27.8 12.6 27.8 11.2 29.6 11.2 29.6 1.3 27.8 1.3 27.8 0 31.4 0"/>
        <polygon points="34.3 11.4 34.3 1.2 40.9 1.2 40.9 2.7 36.1 2.7 36.1 5.5 40.6 5.5 40.6 7 36.1 7 36.1 9.8 40.9 9.8 40.9 11.4 34.3 11.4"/>
        <polygon points="44.8 1.2 44.8 5.5 44.1 5.5 44.1 1.9 44 1.9 43 2.6 43 1.9 44.1 1.2 44.8 1.2"/>
        <polygon points="46.1 5.5 48 1.9 48 1.8 45.8 1.8 45.8 1.2 48.8 1.2 48.8 1.9 46.9 5.5 46.1 5.5"/>
      </svg>
    </a>

    <!-- Desktop links -->
    <div class="hidden sm:flex gap-6">
      <a href="/" class="text-palepink font-medium hover:text-yellow transition-colors">Gallery</a>
      <a href="/add" class="text-palepink font-medium hover:text-yellow transition-colors">Add Entry</a>
    </div>

    <!-- Hamburger (mobile) -->
    <button class="sm:hidden text-palepink focus:outline-none" on:click={() => menuOpen = !menuOpen}>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
      </svg>
    </button>

    <!-- Mobile links -->
    {#if menuOpen}
      <div class="sm:hidden absolute top-full left-0 w-full bg-palepink shadow-md flex flex-col gap-4 px-6 py-4 z-50">
        <a href="/" class="text-blue font-medium hover:text-pink transition-colors">Gallery</a>
        <a href="/add" class="text-blue font-medium hover:text-pink transition-colors">Add Entry</a>
      </div>
    {/if}
  </nav>

  <!-- Page content -->
  <main class="flex-1 p-4 sm:p-6 bg-yellow">
    <slot />
  </main>
</div>