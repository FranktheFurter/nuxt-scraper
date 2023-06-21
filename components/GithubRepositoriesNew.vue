<template>
  <div>
    <li v-for="(item, index) in repos" :key="index">
      <a :href="item.link" target="_blank">
        <p>{{ item.title }}</p>
        <p>{{ item.lang }}</p>
      </a>
    </li>
  </div>
</template>

<script>
import repolist from "public/storage/github.json"

export default {
  data() {
    return {
      repos: repolist.repos,
    }
  },
}
</script>

<style scoped></style>
