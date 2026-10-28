<script setup lang="ts">
import { CATEGORIES } from '@/types'
import type { Category } from '@/types'

// v-model on this component: the parent owns the value, the rail changes it.
const model = defineModel<Category | 'All'>({ required: true })

const options: (Category | 'All')[] = ['All', ...CATEGORIES]

// Static icon shapes (24x24 line icons).
const ICONS: Record<Category | 'All', string> = {
  All: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
  Question:
    '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><path d="M12 17v.01"/>',
  Help: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
  Rent: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
  Sell: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1"/>',
}
</script>

<template>
  <nav class="box rail" aria-label="Categories">
    <button
      v-for="option in options"
      :key="option"
      type="button"
      class="icon-btn"
      :class="{ on: model === option }"
      :aria-label="option"
      :title="option"
      :aria-pressed="model === option"
      @click="model = option"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        v-html="ICONS[option]"
      ></svg>
    </button>
  </nav>
</template>
