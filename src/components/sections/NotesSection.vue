<template>
  <section id="notes" class="portfolio-section notes-section">
    <div class="section-inner">
      <div class="section-heading-row">
        <SectionTitle :title="t.section.notesTitle" :eyebrow="t.section.notesEyebrow" />
        <TextArrowLink :label="t.action.viewAllNotes" :to="{ path: '/blog' }" />
      </div>

      <div class="note-grid">
        <RouterLink
          v-for="note in recentNotes"
          :key="note.slug"
          class="note-card"
          :to="{ name: 'blog-detail', params: { slug: note.slug } }"
        >
          <p class="note-card__date">{{ note.date }}</p>
          <h3>{{ note.title }}</h3>
          <p>{{ note.summary }}</p>
          <TagList :tags="note.tags" />
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
import { getRecentNotes } from '../../content'
import { useLocale } from '../../composables/use-locale'

const { t } = useLocale()
const recentNotes = getRecentNotes()
</script>
