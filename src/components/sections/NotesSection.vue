<template>
  <section id="notes" class="portfolio-section notes-section">
    <div class="section-inner">
      <div class="section-heading-row">
        <SectionTitle :title="t.section.notesTitle" :eyebrow="t.section.notesEyebrow" />
        <TextArrowLink :label="t.action.viewAllNotes" :to="{ path: '/blog' }" />
      </div>

      <div class="note-grid">
        <RouterLink
          v-for="entry in recentEntries"
          :key="entry.slug"
          class="note-card"
          :to="{ name: 'blog-detail', params: { slug: entry.slug } }"
        >
          <p class="note-card__date">{{ entry.dateLabel }} · {{ getSourceLabel(entry.source) }}</p>
          <h3>{{ entry.title }}</h3>
          <p>{{ entry.summary }}</p>
          <TagList :tags="entry.tags" />
          <span>{{ t.action.readNote }} →</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionTitle from '../common/SectionTitle.vue'
import TagList from '../common/TagList.vue'
import TextArrowLink from '../common/TextArrowLink.vue'
import { getRecentJournalEntries } from '../../content'
import type { JournalEntrySource } from '../../content/types'
import { useLocale } from '../../composables/use-locale'

const { t } = useLocale()
const recentEntries = getRecentJournalEntries()

function getSourceLabel(source: JournalEntrySource): string {
  return source === 'experience' ? t.value.blog.experienceLabel : t.value.blog.noteLabel
}
</script>
