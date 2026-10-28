<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useSessionStore } from '@/stores/session'
import { CATEGORIES } from '@/types'
import type { Category } from '@/types'

const router = useRouter()
const store = usePostsStore()
const session = useSessionStore()

// Local state: what the user is typing only matters while this form is open.
const category = ref<Category | ''>('')
const title = ref('')
const content = ref('')
const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')

// Client-side validation: one message per field, empty string means "valid".
const errors = computed(() => {
  const t = title.value.trim()
  return {
    category: category.value ? '' : 'Choose a category.',
    title:
      t.length < 3
        ? 'Title must be at least 3 characters.'
        : t.length > 100
          ? 'Title must be 100 characters or fewer.'
          : '',
    content: content.value.trim() ? '' : 'Content is required.',
  }
})

const isValid = computed(
  () => !errors.value.category && !errors.value.title && !errors.value.content,
)

async function submit() {
  submitted.value = true
  submitError.value = ''
  const chosen = category.value
  if (!isValid.value || chosen === '') return

  submitting.value = true
  try {
    await store.addPost(
      { category: chosen, title: title.value.trim(), content: content.value.trim() },
      session.currentUser,
    )
    await router.push({ name: 'home' })
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Could not publish the post.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="page narrow stack">
    <h1>New post</h1>

    <form class="box pad stack" novalidate @submit.prevent="submit">
      <fieldset class="row">
        <legend>Category</legend>
        <label v-for="option in CATEGORIES" :key="option" class="chip">
          <input v-model="category" type="radio" name="category" :value="option" />
          {{ option }}
        </label>
      </fieldset>
      <p v-if="submitted && errors.category" class="error">{{ errors.category }}</p>

      <label>
        Title
        <input v-model="title" type="text" maxlength="120" placeholder="Short, clear title" />
      </label>
      <p v-if="submitted && errors.title" class="error">{{ errors.title }}</p>

      <label>
        Content
        <textarea
          v-model="content"
          rows="6"
          placeholder="Describe the item or your question"
        ></textarea>
      </label>
      <p v-if="submitted && errors.content" class="error">{{ errors.content }}</p>

      <p v-if="submitError" class="error" role="alert">{{ submitError }}</p>

      <div class="row end">
        <RouterLink :to="{ name: 'home' }" class="btn">Cancel</RouterLink>
        <button class="btn btn-primary" type="submit" :disabled="submitting">
          {{ submitting ? 'Publishing…' : 'Publish' }}
        </button>
      </div>
    </form>
  </div>
</template>
