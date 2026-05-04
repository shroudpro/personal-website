<template>
  <section id="home" class="portfolio-section hero-section">
    <div class="section-inner hero-section__grid">
      <div class="hero-section__content">
        <p class="handwritten">Hello, I'm</p>
        <h1>{{ profile.name }}</h1>
        <p class="hero-section__headline">{{ profile.headline }}</p>
        <p class="hero-section__intro">{{ profile.heroIntro }}</p>
        <TextArrowLink :label="t.action.viewWork" :to="{ path: '/', hash: '#projects' }" />
      </div>

      <div class="section-art hero-section__art">
        <WatercolorBlob tone="wide" />
        <DoodleImage src="/images/doodles/hero-eye.png" alt="手绘眼睛线稿装饰" />
        <p class="handwritten handwritten--note">{{ profile.handwritten.hero }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import DoodleImage from '../common/DoodleImage.vue'
import TextArrowLink from '../common/TextArrowLink.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { profile } from '../../data/profile'
import { useLocale } from '../../composables/use-locale'

const { t } = useLocale()
</script>
