<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import SkeletonCard from '@/components/SkeletonCard.vue'
import StatePanel from '@/components/StatePanel.vue'
import { usePostsStore } from '@/stores/posts'

const store = usePostsStore()
const route = useRoute()

// Read the route parameter: /posts/3 gives id = 3
const id = computed(() => Number(route.params.id))

function load() {
  void store.loadPost(id.value)
}

watch(id, load, { immediate: true })
</script>

<template>
  <div class="page narrow stack">
    <RouterLink :to="{ name: 'home' }" class="btn">← Back to feed</RouterLink>

    <SkeletonCard v-if="store.loading" />

    <StatePanel
      v-else-if="store.error"
      title="Could not load this post"
      :message="store.error"
      action-label="Try again"
      @action="load"
    />

    <template v-else-if="store.currentPost">
      <article class="box pad stack">
        <div class="row">
          <span class="tag">{{ store.currentPost.category }}</span>
          <span
            v-if="store.currentPost.category === 'Help'"
            class="tag"
            :class="{ fill: !store.currentPost.isClosed }"
          >
            {{ store.currentPost.isClosed ? 'Closed' : 'Open' }}
          </span>
          <span class="muted">by {{ store.currentPost.authorName }}</span>
        </div>
        <h1>{{ store.currentPost.title }}</h1>
        <div class="ph big">Post image (one picture, coming later)</div>
        <p>{{ store.currentPost.content }}</p>
      </article>

      <section class="box pad stack">
        <h2>Comments ({{ store.comments.length }})</h2>
        <p v-if="store.comments.length === 0" class="muted">No comments yet.</p>
        <div v-for="comment in store.comments" :key="comment.id" class="comment">
          <span class="muted">{{ comment.authorName }}</span>
          <p>{{ comment.content }}</p>
        </div>
      </section>
    </template>
  </div>
</template>
