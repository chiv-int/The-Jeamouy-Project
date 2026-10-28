import { http } from '@/api/http'
import type { PostComment } from '@/types'

export const commentsApi = {
  listForPost(postId: number): Promise<PostComment[]> {
    return http<PostComment[]>(`/comments?postId=${postId}`)
  },
}
