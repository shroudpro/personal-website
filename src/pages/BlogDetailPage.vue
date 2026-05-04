<template>
  <article v-if="note" class="blog-page blog-page--detail">
    <p class="blog-list__date">{{ note.date }}</p>
    <SectionTitle :title="note.title" :eyebrow="t.blog.detailEyebrow" />
    <p class="blog-page__summary">{{ note.summary }}</p>
    <TagList :tags="note.tags" />

    <MarkdownBlocks :blocks="note.blocks" />

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
import { getNoteBySlug } from '../content'

const route = useRoute()
const { t } = useLocale()
const note = computed(() => getNoteBySlug(String(route.params.slug ?? '')))
</script>
