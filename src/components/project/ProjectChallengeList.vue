<template>
  <section class="project-detail__block">
    <h2>{{ t.project.challenges }}</h2>
    <div class="challenge-list">
      <article v-for="challenge in challenges" :key="challenge.title" class="challenge-card">
        <h3>{{ challenge.title }}</h3>
        <p>{{ challenge.solution }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProjectChallenge } from '../../data/projects'
import { useLocale } from '../../composables/use-locale'

interface ProjectChallengeListProps {
  challenges: ProjectChallenge[]
}

defineProps<ProjectChallengeListProps>()

const { t } = useLocale()
</script>
