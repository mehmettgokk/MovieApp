<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Clapperboard, AlertCircle } from 'lucide-vue-next'
import { useMovieStore } from '../stores/movieStore'
import MovieCard from '../components/MovieCard.vue'
import MovieCardSkeleton from '../components/MovieCardSkeleton.vue'
import Pagination from '../components/Pagination.vue'

const route = useRoute()
const movieStore = useMovieStore()

const categoryTitles = {
  popular: 'Popüler Filmler',
  top_rated: 'En Çok Oy Alanlar',
  now_playing: 'Vizyondaki Filmler',
  upcoming: 'Yakında Gelecek Filmler'
}

const currentCategory = computed(() => route.params.type || 'popular')
const currentTitle = computed(() => categoryTitles[currentCategory.value] || 'Filmler')

const loadCategoryMovies = (page = 1) => {
  movieStore.fetchMoviesByCategory(currentCategory.value, page)
}

// kategori değiştiğinde ona göre veri çekmek için
watch(
  () => route.params.type,
  () => {
    loadCategoryMovies(1)
  },
  { immediate: true }
)
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
      <div class="flex items-center gap-2">
        <Clapperboard class="w-6 h-6 text-amber-500" />
        <h1 class="text-2xl font-bold tracking-tight">{{ currentTitle }}</h1>
      </div>
      <span class="text-sm text-slate-500 dark:text-slate-400">
        Sayfa {{ movieStore.currentPage }} / {{ movieStore.totalPages }}
      </span>
    </div>

    <div
      v-if="movieStore.error"
      class="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 flex items-center gap-3"
    >
      <AlertCircle class="w-5 h-5 shrink-0" />
      <p class="text-sm">{{ movieStore.error }}</p>
    </div>

    <div
      v-if="movieStore.isLoading"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
    >
      <MovieCardSkeleton v-for="n in 20" :key="n" />
    </div>

    <!-- Film Kartları Listesi -->
    <div
      v-else-if="movieStore.movies.length"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
    >
      <MovieCard
        v-for="movie in movieStore.movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <!-- Sayfalama -->
    <Pagination
      v-if="!movieStore.isLoading && movieStore.movies.length"
      :current-page="movieStore.currentPage"
      :total-pages="movieStore.totalPages"
      @change-page="loadCategoryMovies"
    />
  </section>
</template>