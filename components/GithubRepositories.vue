<script lang="ts">
export default {
  setup() {
    const { response } = useScrape("/api/scrape/github")

    return {
      response,
    }
  },
}
</script>

<template>
  <div>
    <div v-if="response.loading">Loading...</div>
    <div v-else-if="response.error">
      An error occurred: {{ response.error }}
    </div>
    <div v-else>
      <li v-for="(item, index) in response.data.repositoriesList" :key="index">
        <NuxtLink :to="item.link">
          <p>{{ item.title }}</p>
          <p>{{ item.language }}</p>
        </NuxtLink>
      </li>
    </div>
  </div>
</template>

<style scoped></style>
