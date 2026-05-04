<template>
  <RouterLink v-if="to" class="text-arrow-link" :to="to">
    <span>{{ label }}</span>
    <span aria-hidden="true">→</span>
  </RouterLink>
  <button v-else class="text-arrow-link text-arrow-link--button" type="button" @click="$emit('click')">
    <span>{{ label }}</span>
    <span aria-hidden="true">→</span>
  </button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { RouterLink } from 'vue-router'

interface TextArrowLinkProps {
  label: string
  to?: RouteLocationRaw
}

defineProps<TextArrowLinkProps>()
defineEmits<{
  click: []
}>()
</script>
