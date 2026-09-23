<template>
  <section id="achievements" ref="sectionRef" class="portfolio-section achievements-section">
    <div class="section-inner section-grid">
      <div>
        <SectionTitle :title="t.section.achievementsTitle" :eyebrow="t.section.achievementsEyebrow" />

        <div class="achievement-stat">
          <img src="/images/doodles/heart-people.png" alt="" />
          <strong>{{ achievementStat.value }}</strong>
          <div>
            <h3>{{ achievementStat.label }}</h3>
            <p>{{ achievementStat.description }}</p>
          </div>
        </div>

        <div class="achievement-grid">
          <article
            v-for="(item, index) in achievements"
            :key="item.title"
            class="achievement-card"
            data-reveal
            :style="{ '--reveal-index': index }"
          >
            <img :src="item.icon" alt="" />
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </div>

      <div class="section-art achievements-section__art">
        <WatercolorBlob />
        <DoodleImage src="/images/doodles/branch.png" alt="枝叶线稿装饰" />
        <p class="handwritten handwritten--note">{{ profile.handwritten.achievement }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DoodleImage from '../common/DoodleImage.vue'
import SectionTitle from '../common/SectionTitle.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { achievements, achievementStat } from '../../data/achievements'
import { profile } from '../../data/profile'
import { useLocale } from '../../composables/use-locale'
import { useRevealOnScroll } from '../../composables/use-reveal-on-scroll'

const { t } = useLocale()
const sectionRef = ref<HTMLElement | null>(null)
useRevealOnScroll(sectionRef)
</script>
