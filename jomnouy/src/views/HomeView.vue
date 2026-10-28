<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CategoryRail from '@/components/CategoryRail.vue'
import PostCard from '@/components/PostCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import StatePanel from '@/components/StatePanel.vue'
import { usePostsStore } from '@/stores/posts'
import type { Category } from '@/types'

const store = usePostsStore()
const route = useRoute()

// Local state: which category icon is selected is only this page's business.
const category = ref<Category | 'All'>('All')
const query = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))

function load() {
  void store.loadPosts({ category: category.value, q: query.value })
}

// Load when the page opens, and again whenever the category or search changes.
watch([category, query], load, { immediate: true })
</script>

<template>
  <div class="page grid3">
    <CategoryRail v-model="category" />

    <main class="stack">
      <p v-if="route.query.denied === '1'" class="notice" role="alert">
        You need to be a moderator to open that page.
      </p>
      <p class="muted">
        Showing: {{ category }}<template v-if="query"> · search “{{ query }}”</template>
      </p>

      <!-- Loading state -->
      <template v-if="store.loading">
        <SkeletonCard v-for="n in 3" :key="n" />
      </template>

      <!-- Error state -->
      <StatePanel
        v-else-if="store.error"
        title="Something went wrong"
        :message="store.error"
        action-label="Try again"
        @action="load"
      />

      <!-- Empty state -->
      <StatePanel
        v-else-if="store.posts.length === 0"
        title="No posts found"
        message="Try another category or a different search."
      />

      <!-- Normal state -->
      <template v-else>
        <PostCard v-for="post in store.posts" :key="post.id" :post="post" />
      </template>
    </main>

    <aside class="stack">
      <div class="box pad dashed">
        <h2>Announcement</h2>
        <p class="muted">Reminder: meet in public places and never pay in advance.</p>
      </div>
      <div class="box pad">
        <h2>Community rules</h2>
        <p class="muted">Be kind. No commercial spam. Report bad behavior.</p>
      </div>
    </aside>
  </div>
</template>
