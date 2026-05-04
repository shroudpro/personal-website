<template>
  <section id="experience" class="portfolio-section experience-section">
    <div class="section-inner section-grid">
      <div>
        <SectionTitle title="Experience" eyebrow="3. Experience / Resume" />
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
        <TextArrowLink label="View Full Resume" :to="{ path: '/', hash: '#contact' }" />
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
import TextArrowLink from '../common/TextArrowLink.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { experiences } from '../../data/experiences'
</script>
