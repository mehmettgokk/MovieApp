export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'

// TMDB görsel için
export const getPosterUrl = (path, size = 'w500') => {
  if (!path) return 'https://placehold.co/500x750/1e293b/ffffff?text=Poster+Yok'
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export const getBackdropUrl = (path, size = 'original') => {
  if (!path) return 'https://placehold.co/1920x1080/0f172a/ffffff?text=Görsel+Yok'
  return `${IMAGE_BASE_URL}/${size}${path}`
}

// Tarih biçimlendirme 
export const formatDate = (dateString) => {
  if (!dateString) return 'Tarih Belirtilmemiş'
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// Süreyi çevirme
export const formatRuntime = (minutes) => {
  if (!minutes) return 'Belirtilmemiş'
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hrs > 0 ? `${hrs}s ${mins}dk` : `${mins}dk`
}