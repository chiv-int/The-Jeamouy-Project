import { ref } from 'vue'
import { defineStore } from 'pinia'
import { reportsApi } from '@/api/reports'
import type { Report } from '@/types'

export const useReportsStore = defineStore('reports', () => {
  const reports = ref<Report[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadReports() {
    loading.value = true
    error.value = null
    try {
      reports.value = await reportsApi.list()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  return { reports, loading, error, loadReports }
})
