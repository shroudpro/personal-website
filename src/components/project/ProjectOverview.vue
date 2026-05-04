<template>
  <section class="project-detail__block">
    <h2>{{ t.project.overview }}</h2>
    <p>{{ project.overview }}</p>
  </section>

  <section class="project-detail__block">
    <h2>{{ t.project.role }}</h2>
    <ul class="project-detail__list">
      <li v-for="role in project.role" :key="role">{{ role }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { ProjectItem } from '../../data/projects'
import { useLocale } from '../../composables/use-locale'

interface ProjectOverviewProps {
  project: ProjectItem
}

defineProps<ProjectOverviewProps>()

const { t } = useLocale()
</script>
