interface ResponseData {
  data: any | null
  loading: boolean
  error: string | null
}

export const useResModel = () => {
  const response = ref<ResponseData>({
    data: null,
    loading: true,
    error: null,
  })
  return response
}
