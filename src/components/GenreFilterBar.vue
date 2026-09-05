<script setup>
import { onMounted } from 'vue'
import { useMovieStore } from '../stores/movieStore'

const movieStore = useMovieStore()

const emit = defineEmits(['select-genre'])

const handleGenreClick = (genreId) => {
  if (movieStore.selectedGenreId === genreId) {
    // Aynı türe basarsa seçimi kaldır (Tümü'ne dön)
    emit('select-genre', null)
  } else {
    emit('select-genre', genreId)
  }
}

onMounted(() => {
  movieStore.fetchGenres()
})
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
    <button
      @click="handleGenreClick(null)"
      class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border"
      :class="movieStore.selectedGenreId === null
        ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-sm'
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'"
    >
      Tümü
    </button>

    
    <button
      v-for="genre in movieStore.genres"
      :key="genre.id"
      @click="handleGenreClick(genre.id)"
      class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border"
      :class="movieStore.selectedGenreId === genre.id
        ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-sm'
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500/50'"
    >
      {{ genre.name }}
    </button>
  </div>
</template>