<template>
  <article v-if="project" class="project-detail">
    <ProjectHero :project="project" />
    <ProjectOverview :project="project" />
    <ProjectFeatureGrid :features="project.features" />

    <section class="project-detail__block">
      <h2>{{ t.project.stack }}</h2>
      <TagList :tags="project.stack" />
    </section>

    <ProjectChallengeList :challenges="project.challenges" />

    <section class="project-detail__block">
      <h2>{{ t.project.result }}</h2>
      <p>{{ project.result }}</p>
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
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SectionTitle from '../components/common/SectionTitle.vue'
import TagList from '../components/common/TagList.vue'
import TextArrowLink from '../components/common/TextArrowLink.vue'
import ProjectChallengeList from '../components/project/ProjectChallengeList.vue'
import ProjectFeatureGrid from '../components/project/ProjectFeatureGrid.vue'
import ProjectHero from '../components/project/ProjectHero.vue'
import ProjectOverview from '../components/project/ProjectOverview.vue'
import { fetchProject } from '../api/content'
import { getProjectById } from '../data/projects'
import type { ProjectItem } from '../data/projects'
import { useLocale } from '../composables/use-locale'

const route = useRoute()
const { t } = useLocale()
const project = ref<ProjectItem | undefined>()

async function loadProject(): Promise<void> {
  const id = String(route.params.id ?? '')
  try {
    project.value = await fetchProject(id)
  } catch {
    project.value = getProjectById(id)
  }
}

onMounted(loadProject)
watch(() => route.params.id, loadProject)
</script>
