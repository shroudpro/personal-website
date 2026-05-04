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
              <p class="timeline__org">{{ item.title || item.category }}</p>
            </div>
            <div class="timeline__content">
              <p class="timeline__description">{{ item.summary }}</p>
              <TagList :tags="item.tags" />
            </div>
          </li>
        </ol>
        <TextArrowLink :label="t.action.viewNotes" :to="{ path: '/blog' }" />
      </div>

      <div class="section-art experience-section__art">
        <WatercolorBlob tone="wide" />
        <DoodleImage src="/images/doodles/mountain.png" alt="山峰线稿装饰" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import DoodleImage from '../common/DoodleImage.vue'
import SectionTitle from '../common/SectionTitle.vue'
import TagList from '../common/TagList.vue'
import TextArrowLink from '../common/TextArrowLink.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { experiences } from '../../content'
import { useLocale } from '../../composables/use-locale'

const { t } = useLocale()
</script>
