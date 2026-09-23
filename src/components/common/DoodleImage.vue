<template>
  <img class="doodle-image doodle-image--float" :src="src" :alt="alt" loading="lazy" />
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
