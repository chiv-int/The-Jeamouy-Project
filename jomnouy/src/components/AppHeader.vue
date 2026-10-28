<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const route = useRoute()
const router = useRouter()
const session = useSessionStore()

// Local state: only the header cares about what is typed in the search box.
const search = ref(typeof route.query.q === 'string' ? route.query.q : '')

watch(
  () => route.query.q,
  (q) => {
    search.value = typeof q === 'string' ? q : ''
  },
)

// If the role is switched to member while on a moderator page, leave that page.
watch(
  () => session.role,
  (role) => {
    if (role !== 'moderator' && route.meta.moderatorOnly) void router.push({ name: 'home' })
  },
)

function submitSearch() {
  const q = search.value.trim()
  void router.push({ name: 'home', query: q ? { q } : {} })
}
</script>

<template>
  <header class="nav">
    <RouterLink :to="{ name: 'home' }" class="brand">Jomnouy</RouterLink>
    <form class="search" role="search" @submit.prevent="submitSearch">
      <label class="sr-only" for="search">Search posts</label>
      <input id="search" v-model="search" type="search" placeholder="Search posts by keyword" />
    </form>
    <span class="spacer"></span>
    <label class="role">
      View as
      <select v-model="session.role">
        <option value="member">Member</option>
        <option value="moderator">Moderator</option>
      </select>
    </label>
    <RouterLink v-if="session.isModerator" :to="{ name: 'moderation' }" class="btn">
      Moderation
    </RouterLink>
    <RouterLink :to="{ name: 'post-new' }" class="btn btn-primary">+ New post</RouterLink>
    <RouterLink
      :to="{ name: 'profile', params: { id: session.currentUser.id } }"
      class="avatar"
      aria-label="My profile"
    >
      {{ session.currentUser.name.charAt(0) }}
    </RouterLink>
  </header>
</template>
