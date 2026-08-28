import { ref, computed } from 'vue'

// State singleton — dibagikan ke semua komponen yang mengimpor useSearch()
const searchQuery = ref('')

export function useSearch() {
  const setSearch = (value) => {
    searchQuery.value = value
  }

  const clearSearch = () => {
    searchQuery.value = ''
  }

  const hasQuery = computed(() => searchQuery.value.trim().length > 0)

  return {
    searchQuery,
    setSearch,
    clearSearch,
    hasQuery
  }
}