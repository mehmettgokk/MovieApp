import apiClient from './api'

export const movieService = {
  // Popüler Filmler
  getPopular(page = 1) {
    return apiClient.get('/movie/popular', { params: { page } })
  },

  // En Çok Oy Alanlar 
  getTopRated(page = 1) {
    return apiClient.get('/movie/top_rated', { params: { page } })
  },

  // Yakında Gelecekler
  getUpcoming(page = 1) {
    return apiClient.get('/movie/upcoming', { params: { page } })
  },

  // Vizyondakiler 
  getNowPlaying(page = 1) {
    return apiClient.get('/movie/now_playing', { params: { page } })
  },

  // Film Detayı
  getMovieDetails(movieId) {
    return apiClient.get(`/movie/${movieId}`)
  },

  // Benzer Filmler
  getSimilarMovies(movieId, page = 1) {
    return apiClient.get(`/movie/${movieId}/similar`, { params: { page } })
  },

  // Film Arama
  searchMovies(query, page = 1) {
    return apiClient.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false
      }
    })
  },

  // Film Türleri
  getGenres() {
    return apiClient.get('/genre/movie/list')
  },

  // Türe Göre Filmleri Keşfet / Filtrele
  discoverByGenre(genreId, page = 1) {
    return apiClient.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
      }
    })
  }
}