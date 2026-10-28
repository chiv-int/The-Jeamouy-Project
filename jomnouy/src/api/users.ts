import { http } from '@/api/http'
import type { User } from '@/types'

export const usersApi = {
  get(id: number): Promise<User> {
    return http<User>(`/users/${id}`)
  },
}
