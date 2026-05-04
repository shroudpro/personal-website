<template>
  <section class="project-detail__block">
    <h2>{{ t.project.overview }}</h2>
    <MarkdownBlocks :blocks="overviewBlocks" />
  </section>

  <section class="project-detail__block">
    <h2>{{ t.project.role }}</h2>
    <MarkdownBlocks :blocks="roleBlocks" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownBlocks from '../common/MarkdownBlocks.vue'
import type { ProjectContent } from '../../content'
import { useLocale } from '../../composables/use-locale'
import { getBlocksByHeading } from '../../content/markdown'

interface ProjectOverviewProps {
  project: ProjectContent
}

const props = defineProps<ProjectOverviewProps>()

const { t } = useLocale()
const overviewBlocks = computed(() => getBlocksByHeading(props.project.blocks, 'Overview'))
const roleBlocks = computed(() => getBlocksByHeading(props.project.blocks, 'My Role'))
</script>
