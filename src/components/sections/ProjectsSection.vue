<template>
  <section id="projects" class="portfolio-section projects-section">
    <div class="section-inner">
      <div class="section-heading-row">
        <SectionTitle title="Selected Projects" eyebrow="4. Projects Showcase" />
        <TextArrowLink label="View All Projects" :to="{ path: '/', hash: '#projects' }" />
      </div>

      <div class="project-grid">
        <RouterLink
          v-for="project in featuredProjects"
          :key="project.id"
          class="project-card"
          :to="{ name: 'project-detail', params: { id: project.id } }"
        >
          <div class="project-card__image">
            <WatercolorBlob tone="small" />
            <DoodleImage :src="project.coverDoodle" :alt="`${project.title} 线稿装饰`" />
          </div>
          <p class="project-card__type">{{ project.type }}</p>
          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>
          <TagList :tags="project.stack" />
          <span class="project-card__link">View Case →</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DoodleImage from '../common/DoodleImage.vue'
import SectionTitle from '../common/SectionTitle.vue'
import TagList from '../common/TagList.vue'
import TextArrowLink from '../common/TextArrowLink.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { getFeaturedProjects } from '../../data/projects'

const featuredProjects = getFeaturedProjects()
</script>
