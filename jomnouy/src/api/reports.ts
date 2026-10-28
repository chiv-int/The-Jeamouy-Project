import { http } from '@/api/http'
import type { Report } from '@/types'

export const reportsApi = {
  list(): Promise<Report[]> {
    return http<Report[]>('/reports?_sort=id&_order=desc')
  },
}
