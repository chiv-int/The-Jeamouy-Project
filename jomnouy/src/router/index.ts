import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/session'

declare module 'vue-router' {
  interface RouteMeta {
    moderatorOnly?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    // "/posts/new" must come before "/posts/:id" so "new" is not read as an id.
    { path: '/posts/new', name: 'post-new', component: () => import('@/views/CreatePostView.vue') },
    // The detail page: ":id" is the route parameter, e.g. /posts/3 (digits only).
    {
      path: '/posts/:id(\\d+)',
      name: 'post-detail',
      component: () => import('@/views/PostDetailView.vue'),
    },
    // Anyone can open anyone's profile: /users/2 shows user 2 and their pinned posts.
    {
      path: '/users/:id(\\d+)',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    // "/profile" is a shortcut to my own profile.
    {
      path: '/profile',
      redirect: () => ({ name: 'profile', params: { id: useSessionStore().currentUser.id } }),
    },
    // A page for one role only: protected by the guard below.
    {
      path: '/moderation',
      name: 'moderation',
      component: () => import('@/views/ModerationView.vue'),
      meta: { moderatorOnly: true },
    },
    // The 404 page goes last: it matches every path that nothing above matched.
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// Guard: members who open a moderator page are sent home with ?denied=1.
router.beforeEach((to) => {
  if (to.meta.moderatorOnly && !useSessionStore().isModerator) {
    return { name: 'home', query: { denied: '1' } }
  }
})

export default router
