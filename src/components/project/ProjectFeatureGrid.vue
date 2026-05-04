<template>
  <section class="project-detail__block">
    <h2>{{ t.project.features }}</h2>
    <div class="feature-grid">
      <article v-for="feature in features" :key="feature" class="feature-card">
        <span aria-hidden="true"></span>
        <h3>{{ feature }}</h3>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocale } from '../../composables/use-locale'

interface ProjectFeatureGridProps {
  features: string[]
}

defineProps<ProjectFeatureGridProps>()

const { t } = useLocale()
</script>
