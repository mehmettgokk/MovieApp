<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Film, AlertCircle } from 'lucide-vue-next'
import { useMovieStore } from '../stores/movieStore'
import MovieCard from '../components/MovieCard.vue'
import MovieCardSkeleton from '../components/MovieCardSkeleton.vue'
import Pagination from '../components/Pagination.vue'

const route = useRoute()
const movieStore = useMovieStore()

const queryText = computed(() => route.query.q || '')

const executeSearch = (page = 1) => {
  if (queryText.value) {
    movieStore.searchMovies(queryText.value, page)
  }
}

watch(
  () => route.query.q,
  () => executeSearch(1),
  { immediate: true }
)
</script>

<template>
  <section class="space-y-6">
    
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
      <div class="flex items-center gap-2">
        <Search class="w-6 h-6 text-amber-500" />
        <h1 class="text-2xl font-bold tracking-tight">
          Arama Sonuçları: <span class="text-amber-500 font-medium">"{{ queryText }}"</span>
        </h1>
      </div>
      <span v-if="movieStore.totalResults > 0" class="text-sm text-slate-500 dark:text-slate-400">
        {{ movieStore.totalResults }} sonuç
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
      <MovieCardSkeleton v-for="n in 10" :key="n" />
    </div>

    <!-- Sonuç Bulunamadı Durumu -->
    <div
      v-else-if="!movieStore.isLoading && movieStore.movies.length === 0"
      class="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/50 space-y-3"
    >
      <Film class="w-12 h-12 text-slate-400 mx-auto" />
      <h3 class="text-lg font-bold">Film Bulunamadı</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
        "{{ queryText }}" aramasıyla eşleşen herhangi bir film bulunamadı. Lütfen farklı kelimeler deneyin.
      </p>
    </div>

    <!-- Listelenen Filmler -->
    <div
      v-else
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
      @change-page="executeSearch"
    />
  </section>
</template>