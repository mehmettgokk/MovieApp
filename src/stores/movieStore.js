import { defineStore } from 'pinia'
import { ref } from 'vue'
import { movieService } from '../services/movieService'

export const useMovieStore = defineStore('movie', () => {
  // State
  const movies = ref([])
  const genres = ref([])
  const selectedGenreId = ref(null)
  const currentMovie = ref(null)
  const similarMovies = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalResults = ref(0)
  const isLoading = ref(false)
  const error = ref(null)

  

  
  const fetchGenres = async () => {
    if (genres.value.length) return
    try {
      const response = await movieService.getGenres()
      genres.value = response.data.genres || []
    } catch (err) {
      console.error('Türler alınamadı:', err)
    }
  }

  
  const fetchMoviesByCategory = async (category = 'popular', page = 1) => {
    isLoading.value = true
    error.value = null
    currentPage.value = page
    selectedGenreId.value = null

    try {
      let response
      switch (category) {
        case 'top_rated':
          response = await movieService.getTopRated(page)
          break
        case 'upcoming':
          response = await movieService.getUpcoming(page)
          break
        case 'now_playing':
          response = await movieService.getNowPlaying(page)
          break
        case 'popular':
        default:
          response = await movieService.getPopular(page)
          break
      }

      movies.value = response.data.results || []
      totalPages.value = Math.min(response.data.total_pages || 1, 500)
      totalResults.value = response.data.total_results || 0
    } catch (err) {
      error.value = err.message || 'Filmler yüklenirken bir hata oluştu.'
      movies.value = []
    } finally {
      isLoading.value = false
    }
  }

  // Türe Göre Filtreleme
  const fetchMoviesByGenre = async (genreId, page = 1) => {
    isLoading.value = true
    error.value = null
    currentPage.value = page
    selectedGenreId.value = genreId

    try {
      const response = await movieService.discoverByGenre(genreId, page)
      movies.value = response.data.results || []
      totalPages.value = Math.min(response.data.total_pages || 1, 500)
      totalResults.value = response.data.total_results || 0
    } catch (err) {
      error.value = err.message || 'Türe göre filmler getirilemedi.'
      movies.value = []
    } finally {
      isLoading.value = false
    }
  }

  // Film Arama
  const searchMovies = async (query, page = 1) => {
    if (!query || !query.trim()) {
      movies.value = []
      return
    }

    isLoading.value = true
    error.value = null
    currentPage.value = page
    selectedGenreId.value = null

    try {
      const response = await movieService.searchMovies(query.trim(), page)
      movies.value = response.data.results || []
      totalPages.value = Math.min(response.data.total_pages || 1, 500)
      totalResults.value = response.data.total_results || 0
    } catch (err) {
      error.value = err.message || 'Arama yapılırken bir hata oluştu.'
      movies.value = []
    } finally {
      isLoading.value = false
    }
  }

  // Film Detay ve Benzer Filmleri Çekme
  const fetchMovieDetails = async (movieId) => {
    isLoading.value = true
    error.value = null
    currentMovie.value = null
    similarMovies.value = []

    try {
      const [detailRes, similarRes] = await Promise.all([
        movieService.getMovieDetails(movieId),
        movieService.getSimilarMovies(movieId)
      ])

      currentMovie.value = detailRes.data
      similarMovies.value = similarRes.data.results?.slice(0, 6) || []
    } catch (err) {
      error.value = err.message || 'Film detayları alınamadı.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    movies,
    genres,
    selectedGenreId,
    currentMovie,
    similarMovies,
    currentPage,
    totalPages,
    totalResults,
    isLoading,
    error,
    fetchGenres,
    fetchMoviesByCategory,
    fetchMoviesByGenre,
    searchMovies,
    fetchMovieDetails
  }
})