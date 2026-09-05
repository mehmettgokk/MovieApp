<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { Star, Clock, Calendar, Heart, ArrowLeft, AlertCircle } from 'lucide-vue-next'
import { useMovieStore } from '../stores/movieStore'
import { useFavoritesStore } from '../stores/favoritesStore'
import { getPosterUrl, getBackdropUrl, formatDate, formatRuntime } from '../utils/constants'
import MovieCard from '../components/MovieCard.vue'

const route = useRoute()
const movieStore = useMovieStore()
const favoritesStore = useFavoritesStore()

const loadDetails = (id) => {
  if (id) movieStore.fetchMovieDetails(id)
}

watch(
  () => route.params.id,
  (newId) => loadDetails(newId),
  { immediate: true }
)
</script>

<template>
  <div v-if="movieStore.isLoading" class="flex items-center justify-center min-h-[50vh]">
    <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
  </div>

  <div
    v-else-if="movieStore.error"
    class="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 flex items-center gap-3"
  >
    <AlertCircle class="w-5 h-5 shrink-0" />
    <p class="text-sm">{{ movieStore.error }}</p>
  </div>

  <div v-else-if="movieStore.currentMovie" class="space-y-12">
    <!-- Geri Butonu -->
    <button
      @click="$router.back()"
      class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors"
    >
      <ArrowLeft class="w-4 h-4" />
      <span>Geri Dön</span>
    </button>

    <!-- Backdrop ve Hero Kartı -->
    <div class="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-xl">
      <!-- Backdrop Görseli -->
      <div class="absolute inset-0">
        <img
          :src="getBackdropUrl(movieStore.currentMovie.backdrop_path)"
          :alt="movieStore.currentMovie.title"
          class="w-full h-full object-cover opacity-25 filter blur-xs"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      </div>

      <!-- İçerik -->
      <div class="relative p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-white">
        <!-- Poster -->
        <div class="w-56 sm:w-64 shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10">
          <img
            :src="getPosterUrl(movieStore.currentMovie.poster_path)"
            :alt="movieStore.currentMovie.title"
            class="w-full h-auto object-cover"
          />
        </div>

        <!-- Bilgiler -->
        <div class="flex-1 space-y-4 text-center md:text-left">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span class="flex items-center gap-1 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-md text-xs font-bold">
              <Star class="w-3.5 h-3.5 fill-slate-950 stroke-slate-950" />
              {{ movieStore.currentMovie.vote_average ? movieStore.currentMovie.vote_average.toFixed(1) : 'N/A' }}
            </span>
            <span class="flex items-center gap-1 text-xs text-slate-300">
              <Clock class="w-3.5 h-3.5" />
              {{ formatRuntime(movieStore.currentMovie.runtime) }}
            </span>
            <span class="flex items-center gap-1 text-xs text-slate-300">
              <Calendar class="w-3.5 h-3.5" />
              {{ formatDate(movieStore.currentMovie.release_date) }}
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl font-black tracking-tight">
            {{ movieStore.currentMovie.title }}
          </h1>

          <p v-if="movieStore.currentMovie.tagline" class="text-sm italic text-slate-400">
            "{{ movieStore.currentMovie.tagline }}"
          </p>

          <!-- Türler -->
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
            <span
              v-for="genre in movieStore.currentMovie.genres"
              :key="genre.id"
              class="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/10 text-slate-200"
            >
              {{ genre.name }}
            </span>
          </div>

          <!-- Özet Açıklama -->
          <div class="pt-2">
            <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1">Özet</h2>
            <p class="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              {{ movieStore.currentMovie.overview || 'Bu film için Türkçe özet bilgisi bulunmuyor.' }}
            </p>
          </div>

          <!-- Favori Butonu -->
          <div class="pt-4">
            <button
              @click="favoritesStore.toggleFavorite(movieStore.currentMovie)"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
              :class="favoritesStore.isFavorite(movieStore.currentMovie.id)
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-white text-slate-950 hover:bg-slate-200'"
            >
              <Heart
                class="w-4 h-4"
                :class="{ 'fill-white': favoritesStore.isFavorite(movieStore.currentMovie.id) }"
              />
              <span>{{ favoritesStore.isFavorite(movieStore.currentMovie.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Benzer Filmler Bölümü -->
    <div v-if="movieStore.similarMovies.length" class="space-y-4">
      <h2 class="text-xl font-bold tracking-tight">Benzer Filmler</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <MovieCard
          v-for="simMovie in movieStore.similarMovies"
          :key="simMovie.id"
          :movie="simMovie"
        />
      </div>
    </div>
  </div>
</template>