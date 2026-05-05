<template>
  <article v-if="entry" class="blog-page blog-page--detail">
    <p class="blog-list__date">{{ entry.dateLabel }}</p>
    <SectionTitle :title="entry.title" :eyebrow="getEyebrow(entry.source)" />
    <p class="blog-page__summary">{{ entry.summary }}</p>
    <TagList :tags="entry.tags" />

    <MarkdownBlocks :blocks="entry.blocks" />

    <TextArrowLink :label="t.action.viewAllNotes" :to="{ path: '/blog' }" />
  </article>

  <section v-else class="blog-page blog-page--empty">
    <SectionTitle :title="t.blog.notFoundTitle" eyebrow="404" />
    <p>{{ t.blog.notFoundText }}</p>
    <TextArrowLink :label="t.action.viewAllNotes" :to="{ path: '/blog' }" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownBlocks from '../components/common/MarkdownBlocks.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import TagList from '../components/common/TagList.vue'
import TextArrowLink from '../components/common/TextArrowLink.vue'
import { useLocale } from '../composables/use-locale'
import { getJournalEntryBySlug } from '../content'
import type { JournalEntrySource } from '../content/types'

const route = useRoute()
const { t } = useLocale()
const entry = computed(() => getJournalEntryBySlug(String(route.params.slug ?? '')))

function getEyebrow(source: JournalEntrySource): string {
  return source === 'experience' ? t.value.blog.experienceLabel : t.value.blog.detailEyebrow
}
</script>
