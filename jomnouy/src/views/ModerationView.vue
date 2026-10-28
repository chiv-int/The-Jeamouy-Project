<script setup lang="ts">
import SkeletonCard from '@/components/SkeletonCard.vue'
import StatePanel from '@/components/StatePanel.vue'
import { useReportsStore } from '@/stores/reports'

const store = useReportsStore()

function load() {
  void store.loadReports()
}

load()
</script>

<template>
  <div class="page narrow stack">
    <h1>Moderation: reported content</h1>
    <p class="muted">Moderators only. Delete, ban and dismiss actions come after M1.</p>

    <template v-if="store.loading">
      <SkeletonCard v-for="n in 2" :key="n" />
    </template>

    <StatePanel
      v-else-if="store.error"
      title="Could not load reports"
      :message="store.error"
      action-label="Try again"
      @action="load"
    />

    <StatePanel
      v-else-if="store.reports.length === 0"
      title="No reports"
      message="Nothing needs your attention."
    />

    <div v-else class="box table-wrap">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Target</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in store.reports" :key="report.id">
            <td>{{ report.postId !== null ? 'Post' : 'Comment' }}</td>
            <td>
              <RouterLink
                v-if="report.postId !== null"
                :to="{ name: 'post-detail', params: { id: report.postId } }"
              >
                Post #{{ report.postId }}
              </RouterLink>
              <span v-else>Comment #{{ report.commentId }}</span>
            </td>
            <td>{{ report.reason }}</td>
            <td>
              <span class="tag">{{ report.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
