<template>
  <section id="experience" class="portfolio-section experience-section">
    <div class="section-inner section-grid">
      <div>
        <SectionTitle :title="t.section.experienceTitle" :eyebrow="t.section.experienceEyebrow" />
        <ol class="timeline">
          <li v-for="item in experiences" :key="`${item.period}-${item.role}`" class="timeline__item">
            <span class="timeline__dot" aria-hidden="true"></span>
            <p class="timeline__period">{{ item.period }}</p>
            <div>
              <h3>{{ item.role }}</h3>
              <p class="timeline__org">{{ item.org }}</p>
            </div>
            <p class="timeline__description">{{ item.description }}</p>
          </li>
        </ol>
        <TextArrowLink :label="t.action.viewResume" :to="{ path: '/', hash: '#contact' }" />
      </div>

      <div class="section-art experience-section__art">
        <WatercolorBlob tone="wide" />
        <DoodleImage src="/images/doodles/mountain.png" alt="山峰线稿装饰" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DoodleImage from '../common/DoodleImage.vue'
import SectionTitle from '../common/SectionTitle.vue'
import TextArrowLink from '../common/TextArrowLink.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { fetchExperiences } from '../../api/content'
import { experiences as fallbackExperiences } from '../../data/experiences'
import type { ExperienceItem } from '../../data/experiences'
import { useLocale } from '../../composables/use-locale'

const { t } = useLocale()
const experiences = ref<ExperienceItem[]>(fallbackExperiences)

onMounted(async () => {
  try {
    const apiExperiences = await fetchExperiences()
    experiences.value = apiExperiences.length ? apiExperiences : fallbackExperiences
  } catch {
    experiences.value = fallbackExperiences
  }
})
</script>
