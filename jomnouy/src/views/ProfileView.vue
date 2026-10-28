<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '@/components/PostCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import StatePanel from '@/components/StatePanel.vue'
import { useProfileStore } from '@/stores/profile'
import { useSessionStore } from '@/stores/session'

const store = useProfileStore()
const session = useSessionStore()
const route = useRoute()

// /users/2 gives id = 2. The same page shows my profile or someone else's.
const id = computed(() => Number(route.params.id))
const isMine = computed(() => id.value === session.currentUser.id)

function load() {
  void store.loadProfile(id.value)
}

watch(id, load, { immediate: true })
</script>

<template>
  <div class="page narrow stack">
    <template v-if="store.loading">
      <SkeletonCard v-for="n in 2" :key="n" />
    </template>

    <StatePanel
      v-else-if="store.error"
      title="Could not load this profile"
      :message="store.error"
      action-label="Try again"
      @action="load"
    />

    <template v-else-if="store.user">
      <div class="row profile-head">
        <div class="avatar big-avatar">{{ store.user.name.charAt(0) }}</div>
        <div>
          <h1>{{ store.user.name }}</h1>
          <span class="muted">{{ isMine ? 'This is your profile' : 'Member' }}</span>
        </div>
      </div>

      <h2>Pinned posts</h2>
      <StatePanel
        v-if="store.pinnedPosts.length === 0"
        title="No pinned posts"
        :message="isMine ? 'Pin a post to show it here.' : 'This member has not pinned any posts.'"
      />
      <PostCard v-for="post in store.pinnedPosts" v-else :key="post.id" :post="post" />

      <h2>Posts</h2>
      <StatePanel
        v-if="store.posts.length === 0"
        title="No posts yet"
        message="Posts will appear here."
      />
      <PostCard v-for="post in store.posts" v-else :key="post.id" :post="post" />
    </template>
  </div>
</template>
