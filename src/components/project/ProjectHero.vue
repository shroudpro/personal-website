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
          {{ action.label }} →
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
import type { ProjectItem } from '../../data/projects'
import { getProjectActions } from '../../data/projects'
import DoodleImage from '../common/DoodleImage.vue'
import TagList from '../common/TagList.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'

interface ProjectHeroProps {
  project: ProjectItem
}

const props = defineProps<ProjectHeroProps>()

const projectActions = computed(() => getProjectActions(props.project))
</script>
