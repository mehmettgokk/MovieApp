import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const FAVORITES_STORAGE_KEY = 'tmdb_movie_favorites_v1'

export const useFavoritesStore = defineStore('favorites', () => {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
  const favorites = ref(savedFavorites ? JSON.parse(savedFavorites) : [])

  // LocalStorage ile senkronizasyon
  watch(
    favorites,
    (newFavorites) => {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites))
    },
    { deep: true } // deep watch
  )

  // Favoriye ekleme, çıkarma
  const toggleFavorite = (movie) => {
    const index = favorites.value.findIndex((item) => item.id === movie.id)
    if (index === -1) {
      favorites.value.unshift({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date
      })
    } else {
      favorites.value.splice(index, 1)
    }
  }

  // Bir film favorilerde mi kontrolü
  const isFavorite = (movieId) => {
    return favorites.value.some((item) => item.id === movieId)
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite
  }
})