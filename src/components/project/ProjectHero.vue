<template>
  <section class="project-detail__hero">
    <div>
      <p class="project-detail__type">{{ project.type }}</p>
      <h1>{{ project.title }}</h1>
      <p>{{ project.summary }}</p>
      <TagList :tags="project.stack" />
      <div v-if="projectActions.length" class="project-detail__actions">
        <a
          v-for="action in projectActions"
          :key="action.label"
          :href="action.href"
          target="_blank"
          rel="noreferrer"
        >
          {{ getActionLabel(action.label) }} →
        </a>
      </div>
    </div>
    <div class="section-art project-detail__art">
      <WatercolorBlob tone="wide" />
      <DoodleImage :src="project.coverDoodle" :alt="`${project.title} 线稿装饰`" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectContent } from '../../content'
import { getProjectActions } from '../../content'
import DoodleImage from '../common/DoodleImage.vue'
import TagList from '../common/TagList.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { useLocale } from '../../composables/use-locale'

interface ProjectHeroProps {
  project: ProjectContent
}

const props = defineProps<ProjectHeroProps>()

const { t } = useLocale()
const projectActions = computed(() => getProjectActions(props.project))

function getActionLabel(label: string): string {
  if (label === 'View GitHub') {
    return t.value.action.viewGithub
  }
  if (label === 'View Demo') {
    return t.value.action.viewDemo
  }
  return label
}
</script>
