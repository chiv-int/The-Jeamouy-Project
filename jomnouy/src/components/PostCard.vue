<script setup lang="ts">
import type { Post } from '@/types'

// Props: the parent gives each card one post.
defineProps<{ post: Post }>()
</script>

<template>
  <article class="box card">
    <div class="thumb ph">Image</div>
    <div class="card-body">
      <div class="row">
        <span class="tag">{{ post.category }}</span>
        <span v-if="post.category === 'Help'" class="tag" :class="{ fill: !post.isClosed }">
          {{ post.isClosed ? 'Closed' : 'Open' }}
        </span>
        <span class="muted">
          by
          <RouterLink :to="{ name: 'profile', params: { id: post.userId } }">{{
            post.authorName
          }}</RouterLink>
        </span>
      </div>
      <h3>
        <RouterLink :to="{ name: 'post-detail', params: { id: post.id } }">{{
          post.title
        }}</RouterLink>
      </h3>
      <p class="muted clamp">{{ post.content }}</p>
    </div>
  </article>
</template>
