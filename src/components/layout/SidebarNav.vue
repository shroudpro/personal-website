<template>
  <aside class="sidebar" aria-label="站点导航">
    <RouterLink class="sidebar__logo" :to="{ path: '/', hash: '#home' }" aria-label="返回首页">
      <img src="/images/doodles/eye-logo.png" alt="" />
    </RouterLink>

    <nav class="sidebar__nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.target"
        class="sidebar__link"
        :class="{ 'is-active': activeTarget === item.target }"
        :to="{ path: '/', hash: `#${item.target}` }"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="sidebar__footer">
      <div class="sidebar__socials" aria-label="社交链接">
        <a
          v-for="link in enabledSocialLinks"
          :key="link.label"
          class="sidebar__social"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
          :aria-label="link.label"
        >
          {{ link.label.slice(0, 2) }}
        </a>
      </div>
      <p>© 2026 {{ profile.name }}</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { navItems } from '../../data/nav'
import { profile } from '../../data/profile'

const activeTarget = ref(navItems[0]?.target ?? 'home')
const enabledSocialLinks = computed(() => profile.contactLinks.filter((link) => link.enabled))

function updateActiveTarget(): void {
  const visibleTarget = navItems.find((item) => {
    const element = document.getElementById(item.target)
    if (!element) {
      return false
    }

    const rect = element.getBoundingClientRect()
    return rect.top <= 160 && rect.bottom >= 160
  })

  if (visibleTarget) {
    activeTarget.value = visibleTarget.target
  }
}

onMounted(() => {
  updateActiveTarget()
  window.addEventListener('scroll', updateActiveTarget, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveTarget)
})
</script>
