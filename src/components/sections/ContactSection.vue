<template>
  <section id="contact" class="portfolio-section contact-section">
    <div class="section-inner section-grid">
      <div>
        <SectionTitle :title="t.section.contactTitle" :eyebrow="t.section.contactEyebrow" />
        <p class="contact-section__intro">{{ profile.contactIntro }}</p>

        <ul class="contact-links contact-links--panel">
          <li v-for="link in profile.contactLinks" :key="link.label">
            <span>{{ contactLabelMap[link.label] }}</span>
            <a v-if="link.enabled" :href="link.href" target="_blank" rel="noreferrer">
              {{ link.value }}
            </a>
            <em v-else>{{ link.value || t.contact.disabled }}</em>
          </li>
          <li>
            <span>{{ t.contact.status }}</span>
            <em>{{ profile.status }}</em>
          </li>
          <li>
            <span>{{ t.contact.location }}</span>
            <em>{{ profile.location }}</em>
          </li>
        </ul>
      </div>

      <div class="section-art contact-section__art">
        <WatercolorBlob tone="wide" />
        <DoodleImage src="/images/doodles/coffee-hand.png" alt="咖啡杯和手绘线稿装饰" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DoodleImage from '../common/DoodleImage.vue'
import SectionTitle from '../common/SectionTitle.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { profile } from '../../data/profile'
import { useLocale } from '../../composables/use-locale'

const { t } = useLocale()
const contactLabelMap = computed<Record<string, string>>(() => ({
  Email: t.value.contact.email,
  GitHub: t.value.contact.github,
  Resume: t.value.contact.resume,
}))
</script>
