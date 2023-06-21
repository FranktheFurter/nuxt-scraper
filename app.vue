<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">An error occurred: {{ error }}</div>
    <div v-else>Title: {{ title }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"

export default {
  setup() {
    const title = ref("")
    const loading = ref(true)
    const error = ref(null)

    const fetchTitle = async () => {
      try {
        const response = await fetch("/api/scrape")
        const data = await response.json()
        title.value = data.title
      } catch (e) {
        error.value = e.message
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchTitle)

    return {
      title,
      loading,
      error,
    }
  },
}
</script>
