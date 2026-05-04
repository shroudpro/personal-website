<template>
  <section id="about" class="portfolio-section about-section">
    <div class="section-inner">
      <div class="section-grid">
        <div>
          <SectionTitle :title="t.section.aboutTitle" :eyebrow="t.section.aboutEyebrow" />
          <div class="copy-block">
            <p v-for="paragraph in profile.aboutIntro" :key="paragraph">{{ paragraph }}</p>
          </div>
          <TextArrowLink :label="t.action.moreAbout" :to="{ path: '/', hash: '#experience' }" />

          <ul class="contact-links contact-links--panel about-section__contact">
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

        <div class="section-art about-section__art">
          <WatercolorBlob />
          <DoodleImage src="/images/doodles/desk-scene.png" alt="桌面和椅子线稿装饰" />
        </div>
      </div>

      <div class="capability-grid">
        <article v-for="tag in profile.capabilityTags" :key="tag.title" class="capability-card">
          <span class="capability-card__mark" aria-hidden="true"></span>
          <h3>{{ tag.title }}</h3>
          <p>{{ tag.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DoodleImage from '../common/DoodleImage.vue'
import SectionTitle from '../common/SectionTitle.vue'
import TextArrowLink from '../common/TextArrowLink.vue'
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
