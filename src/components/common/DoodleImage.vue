<template>
  <img class="doodle-image" :src="src" :alt="alt" loading="lazy" />
</template>

<script setup lang="ts">
interface DoodleImageProps {
  src: string
  alt?: string
}

withDefaults(defineProps<DoodleImageProps>(), {
  alt: '',
})
</script>
