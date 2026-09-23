<template>
  <section id="projects" ref="sectionRef" class="portfolio-section projects-section">
    <div class="section-inner">
      <div class="section-heading-row">
        <SectionTitle :title="t.section.projectsTitle" :eyebrow="t.section.projectsEyebrow" />
        <TextArrowLink :label="t.action.viewAllProjects" :to="{ path: '/', hash: '#projects' }" />
      </div>

      <div class="project-grid">
        <RouterLink
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          class="project-card card-tilt"
          data-reveal
          :style="{ '--reveal-index': index }"
          :to="{ name: 'project-detail', params: { id: getProjectRouteId(project) } }"
          @pointermove="handlePointerMove"
          @pointerleave="resetTilt"
        >
          <div class="project-card__image">
            <WatercolorBlob tone="small" />
            <DoodleImage :src="project.coverDoodle" :alt="`${project.title} 线稿装饰`" />
          </div>
          <p class="project-card__type">{{ project.type }}</p>
          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>
          <TagList :tags="project.stack" />
          <span class="project-card__link">{{ t.action.viewCase }} →</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import DoodleImage from '../common/DoodleImage.vue'
import SectionTitle from '../common/SectionTitle.vue'
import TagList from '../common/TagList.vue'
import TextArrowLink from '../common/TextArrowLink.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { getFeaturedProjects, getProjectRouteId } from '../../content'
import { useLocale } from '../../composables/use-locale'
import { useCardTilt } from '../../composables/use-card-tilt'
import { useRevealOnScroll } from '../../composables/use-reveal-on-scroll'

const { t } = useLocale()
const featuredProjects = getFeaturedProjects()
const sectionRef = ref<HTMLElement | null>(null)
const { handlePointerMove, resetTilt } = useCardTilt()
useRevealOnScroll(sectionRef)
</script>
