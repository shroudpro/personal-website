<template>
  <section class="blog-page">
    <SectionTitle :title="t.blog.listTitle" :eyebrow="t.blog.listEyebrow" />

    <div v-if="experienceEntries.length" class="blog-experience-list">
      <article
        v-for="entry in experienceEntries"
        :key="entry.slug"
        class="blog-experience"
      >
        <RouterLink
          class="blog-experience__heading"
          :to="{ name: 'blog-detail', params: { slug: entry.slug } }"
        >
          <p class="blog-list__date">{{ entry.dateLabel }} · {{ entry.eyebrow }}</p>
          <h2>{{ entry.title }}</h2>
          <p>{{ entry.summary }}</p>
          <TagList :tags="entry.tags" />
        </RouterLink>
        <MarkdownBlocks :blocks="entry.blocks" />
      </article>
    </div>

    <div v-if="noteEntries.length" class="blog-notes-block">
      <h2>{{ t.blog.otherNotesTitle }}</h2>
      <div class="blog-list">
        <RouterLink
          v-for="entry in noteEntries"
          :key="entry.slug"
          class="blog-list__item"
          :to="{ name: 'blog-detail', params: { slug: entry.slug } }"
        >
          <p class="blog-list__date">{{ entry.dateLabel }} · {{ t.blog.noteLabel }}</p>
          <h3>{{ entry.title }}</h3>
          <p>{{ entry.summary }}</p>
          <TagList :tags="entry.tags" />
        </RouterLink>
      </div>
    </div>

    <p v-if="!journalEntries.length" class="blog-page__empty">{{ t.blog.emptyText }}</p>

    <TextArrowLink :label="t.action.backHome" :to="{ path: '/', hash: '#notes' }" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import MarkdownBlocks from '../components/common/MarkdownBlocks.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import TagList from '../components/common/TagList.vue'
import TextArrowLink from '../components/common/TextArrowLink.vue'
import { useLocale } from '../composables/use-locale'
import { journalEntries } from '../content'

const { t } = useLocale()
const experienceEntries = computed(() =>
  journalEntries.filter((entry) => entry.source === 'experience'),
)
const noteEntries = computed(() => journalEntries.filter((entry) => entry.source === 'note'))
</script>
