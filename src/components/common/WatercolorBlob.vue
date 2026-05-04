<template>
  <span class="watercolor-blob" :class="toneClass" aria-hidden="true"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface WatercolorBlobProps {
  tone?: 'soft' | 'wide' | 'small'
}

const props = withDefaults(defineProps<WatercolorBlobProps>(), {
  tone: 'soft',
})

const toneClass = computed(() => `watercolor-blob--${props.tone}`)
</script>
