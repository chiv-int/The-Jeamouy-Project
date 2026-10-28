import { ref } from 'vue'
import { defineStore } from 'pinia'
import { usersApi } from '@/api/users'
import { pinsApi } from '@/api/pins'
import { postsApi } from '@/api/posts'
import type { Post, User } from '@/types'

// The profile page being viewed (mine or someone else's).
// It has its own store so it does not overwrite the home feed's posts list.
export const useProfileStore = defineStore('profile', () => {
  const user = ref<User | null>(null)
  const pinnedPosts = ref<Post[]>([])
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProfile(userId: number) {
    loading.value = true
    error.value = null
    user.value = null
    try {
      const [profileUser, pins, userPosts] = await Promise.all([
        usersApi.get(userId),
        pinsApi.listForUser(userId),
        postsApi.list({ userId }),
      ])
      user.value = profileUser
      posts.value = userPosts
      pinnedPosts.value = await postsApi.listByIds(pins.map((pin) => pin.postId))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  return { user, pinnedPosts, posts, loading, error, loadProfile }
})
