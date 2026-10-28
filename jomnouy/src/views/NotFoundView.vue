<script setup lang="ts">
import StatePanel from '@/components/StatePanel.vue'
</script>

<template>
  <div class="page narrow stack">
    <StatePanel title="Page not found" message="This page does not exist."> </StatePanel>
    <RouterLink :to="{ name: 'home' }" class="btn">← Back to feed</RouterLink>
  </div>
</template>
