<template>
  <article v-if="project" class="project-detail">
    <ProjectHero :project="project" />

    <section
      v-for="section in projectSections"
      :key="section.title"
      class="project-detail__block"
    >
      <h2>{{ section.title }}</h2>
      <MarkdownBlocks v-if="section.blocks.length" :blocks="section.blocks" />
      <p v-else class="project-detail__empty-text">{{ t.project.emptySection }}</p>
    </section>

    <TextArrowLink :label="t.action.backHome" :to="{ path: '/', hash: '#projects' }" />
  </article>

  <section v-else class="project-detail project-detail--empty">
    <SectionTitle :title="t.project.notFoundTitle" eyebrow="404" />
    <p>{{ t.project.notFoundText }}</p>
    <TextArrowLink :label="t.action.backHome" :to="{ path: '/', hash: '#projects' }" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownBlocks from '../components/common/MarkdownBlocks.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import TextArrowLink from '../components/common/TextArrowLink.vue'
import ProjectHero from '../components/project/ProjectHero.vue'
import { useLocale } from '../composables/use-locale'
import { getBlocksByHeading } from '../content/markdown'
import { getProjectById } from '../content'

const route = useRoute()
const { t } = useLocale()
const project = computed(() => getProjectById(String(route.params.id ?? '')))

const projectSections = computed(() => {
  if (!project.value) {
    return []
  }

  return [
    { title: t.value.project.overview, blocks: getBlocksByHeading(project.value.blocks, 'Overview') },
    { title: t.value.project.role, blocks: getBlocksByHeading(project.value.blocks, 'My Role') },
    {
      title: t.value.project.features,
      blocks: getBlocksByHeading(project.value.blocks, 'Core Features'),
    },
    { title: t.value.project.stack, blocks: getBlocksByHeading(project.value.blocks, 'Tech Stack') },
    {
      title: t.value.project.challenges,
      blocks: getBlocksByHeading(project.value.blocks, 'Challenges & Solutions'),
    },
    { title: t.value.project.result, blocks: getBlocksByHeading(project.value.blocks, 'Result') },
  ]
})
</script>
