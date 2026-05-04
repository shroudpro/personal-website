<template>
  <ul class="tag-list" aria-label="技术栈">
    <li v-for="tag in tags" :key="tag">{{ tag }}</li>
  </ul>
</template>

<script setup lang="ts">
interface TagListProps {
  tags: string[]
}

defineProps<TagListProps>()
</script>
