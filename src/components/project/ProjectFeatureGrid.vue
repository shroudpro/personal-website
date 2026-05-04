<template>
  <section class="project-detail__block">
    <h2>Core Features</h2>
    <div class="feature-grid">
      <article v-for="feature in features" :key="feature" class="feature-card">
        <span aria-hidden="true"></span>
        <h3>{{ feature }}</h3>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ProjectFeatureGridProps {
  features: string[]
}

defineProps<ProjectFeatureGridProps>()
</script>
