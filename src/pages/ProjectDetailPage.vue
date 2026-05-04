<template>
  <article v-if="project" class="project-detail">
    <ProjectHero :project="project" />
    <ProjectOverview :project="project" />
    <ProjectFeatureGrid :features="project.features" />

    <section class="project-detail__block">
      <h2>Tech Stack</h2>
      <TagList :tags="project.stack" />
    </section>

    <ProjectChallengeList :challenges="project.challenges" />

    <section class="project-detail__block">
      <h2>Result</h2>
      <p>{{ project.result }}</p>
    </section>

    <TextArrowLink label="Back Home" :to="{ path: '/', hash: '#projects' }" />
  </article>

  <section v-else class="project-detail project-detail--empty">
    <SectionTitle title="Project Not Found" eyebrow="404" />
    <p>没有找到对应的项目内容，请返回首页查看精选项目。</p>
    <TextArrowLink label="Back Home" :to="{ path: '/', hash: '#projects' }" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SectionTitle from '../components/common/SectionTitle.vue'
import TagList from '../components/common/TagList.vue'
import TextArrowLink from '../components/common/TextArrowLink.vue'
import ProjectChallengeList from '../components/project/ProjectChallengeList.vue'
import ProjectFeatureGrid from '../components/project/ProjectFeatureGrid.vue'
import ProjectHero from '../components/project/ProjectHero.vue'
import ProjectOverview from '../components/project/ProjectOverview.vue'
import { getProjectById } from '../data/projects'

const route = useRoute()

const project = computed(() => {
  const id = String(route.params.id ?? '')
  return getProjectById(id)
})
</script>
