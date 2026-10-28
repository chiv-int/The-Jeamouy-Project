<script setup lang="ts">
// Used for the "empty" and "error" states.
defineProps<{
  title: string
  message?: string
  actionLabel?: string
}>()

const emit = defineEmits<{ action: [] }>()
</script>

<template>
  <div class="box state" role="status">
    <h2>{{ title }}</h2>
    <p v-if="message" class="muted">{{ message }}</p>
    <button v-if="actionLabel" class="btn btn-primary" type="button" @click="emit('action')">
      {{ actionLabel }}
    </button>
  </div>
</template>
