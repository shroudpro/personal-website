<template>
  <div class="markdown-content">
    <template v-for="(block, index) in blocks" :key="`${block.type}-${index}-${block.text ?? ''}`">
      <h2 v-if="block.type === 'heading' && block.level === 2">{{ block.text }}</h2>
      <h3 v-else-if="block.type === 'heading'">{{ block.text }}</h3>
      <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>
      <ul v-else-if="block.type === 'list'">
        <li v-for="item in block.items" :key="item">{{ item }}</li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { MarkdownBlock } from '../../content/types'

interface MarkdownBlocksProps {
  blocks: MarkdownBlock[]
}

defineProps<MarkdownBlocksProps>()
</script>
