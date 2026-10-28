import { http } from '@/api/http'
import type { Pin } from '@/types'

export const pinsApi = {
  listForUser(userId: number): Promise<Pin[]> {
    return http<Pin[]>(`/pins?userId=${userId}`)
  },
}
