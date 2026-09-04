import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'tr-TR' // verileri türkçe çekeceğiz
  }
})

// Hata yakalamak için interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.status_message || error.message || 'API İsteği Başarısız Oldu'
    console.error('[TMDB API Error]:', message)
    return Promise.reject(new Error(message))
  }
)

export default apiClient