import { http } from '@/api/http'
import type { Category, NewPost, Post, User } from '@/types'

export interface PostFilters {
  category?: Category | 'All'
  q?: string
  userId?: number
}

export const postsApi = {
  list(filters: PostFilters = {}): Promise<Post[]> {
    const params = new URLSearchParams({ _sort: 'id', _order: 'desc' })
    if (filters.category && filters.category !== 'All') params.set('category', filters.category)
    if (filters.q) params.set('q', filters.q)
    if (filters.userId) params.set('userId', String(filters.userId))
    return http<Post[]>(`/posts?${params.toString()}`)
  },

  listByIds(ids: number[]): Promise<Post[]> {
    if (ids.length === 0) return Promise.resolve([])
    const params = new URLSearchParams()
    ids.forEach((id) => params.append('id', String(id)))
    return http<Post[]>(`/posts?${params.toString()}`)
  },

  get(id: number): Promise<Post> {
    return http<Post>(`/posts/${id}`)
  },

  create(data: NewPost, user: User): Promise<Post> {
    return http<Post>('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        userId: user.id,
        authorName: user.name,
        isClosed: false,
        createdAt: new Date().toISOString(),
      }),
    })
  },
}
