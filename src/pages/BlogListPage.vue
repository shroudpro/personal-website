<template>
  <section class="blog-page">
    <SectionTitle :title="t.blog.listTitle" :eyebrow="t.blog.listEyebrow" />

    <div v-if="notes.length" class="blog-list">
      <RouterLink
        v-for="note in notes"
        :key="note.slug"
        class="blog-list__item"
        :to="{ name: 'blog-detail', params: { slug: note.slug } }"
      >
        <p class="blog-list__date">{{ note.date }}</p>
        <h2>{{ note.title }}</h2>
        <p>{{ note.summary }}</p>
        <TagList :tags="note.tags" />
      </RouterLink>
    </div>

    <p v-else class="blog-page__empty">{{ t.blog.emptyText }}</p>

    <TextArrowLink :label="t.action.backHome" :to="{ path: '/', hash: '#notes' }" />
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionTitle from '../components/common/SectionTitle.vue'
import TagList from '../components/common/TagList.vue'
import TextArrowLink from '../components/common/TextArrowLink.vue'
import { useLocale } from '../composables/use-locale'
import { notes } from '../content'

const { t } = useLocale()
</script>
