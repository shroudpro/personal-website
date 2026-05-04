<template>
  <div class="app-shell">
    <SidebarNav />
    <main class="app-main" aria-label="页面主要内容">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import SidebarNav from './SidebarNav.vue'
</script>
