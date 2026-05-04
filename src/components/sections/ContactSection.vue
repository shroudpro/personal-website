<template>
  <section id="contact" class="portfolio-section contact-section">
    <div class="section-inner section-grid">
      <div>
        <SectionTitle title="Let’s Connect" eyebrow="6. Contact" />
        <p class="contact-section__intro">{{ profile.contactIntro }}</p>

        <form class="contact-form" @submit.prevent="showStaticNotice">
          <label>
            <span>Name</span>
            <input type="text" autocomplete="name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" autocomplete="email" />
          </label>
          <label>
            <span>Message</span>
            <textarea rows="4"></textarea>
          </label>
          <TextArrowLink label="Send Message" @click="showStaticNotice" />
          <p v-if="noticeVisible" class="contact-form__notice" role="status">
            {{ profile.contactNotice }}
          </p>
        </form>

        <ul class="contact-links">
          <li v-for="link in profile.contactLinks" :key="link.label">
            <span>{{ link.label }}</span>
            <a v-if="link.enabled" :href="link.href" target="_blank" rel="noreferrer">
              {{ link.value }}
            </a>
            <em v-else>{{ link.value }}</em>
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
import { ref } from 'vue'
import DoodleImage from '../common/DoodleImage.vue'
import SectionTitle from '../common/SectionTitle.vue'
import TextArrowLink from '../common/TextArrowLink.vue'
import WatercolorBlob from '../common/WatercolorBlob.vue'
import { profile } from '../../data/profile'

const noticeVisible = ref(false)

function showStaticNotice(): void {
  noticeVisible.value = true
}
</script>
