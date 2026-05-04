<template>
  <header class="section-title">
    <p v-if="eyebrow" class="section-title__eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <span class="section-title__line" aria-hidden="true"></span>
  </header>
</template>

<script setup lang="ts">
interface SectionTitleProps {
  title: string
  eyebrow?: string
}

defineProps<SectionTitleProps>()
</script>
