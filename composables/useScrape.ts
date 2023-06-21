import { ref, onMounted } from "vue"

export default function useScrape(url: string) {
  const response = useResModel()
  const fetchData = async () => {
    try {
      const fetchResponse = await fetch(url)
      const jsonData = await fetchResponse.json()
      response.value.data = jsonData
    } catch (e: unknown) {
      if (e instanceof Error) {
        response.value.error = e.message
      } else {
        response.value.error = "An error occurred"
      }
    } finally {
      response.value.loading = false
    }
  }

  onMounted(fetchData)

  return { response }
}
