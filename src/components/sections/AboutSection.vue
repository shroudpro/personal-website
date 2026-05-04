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
import DoodleImage from '../common/DoodleImage.vue'
import SectionTitle from '../common/SectionTitle.vue'
import TextArrowLink from '../common/TextArrowLink.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { profile } from '../../data/profile'
import { useLocale } from '../../composables/use-locale'

const { t } = useLocale()
</script>
