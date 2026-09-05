<script setup>
import { Heart, Film } from 'lucide-vue-next'
import { useFavoritesStore } from '../stores/favoritesStore'
import MovieCard from '../components/MovieCard.vue'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <section class="space-y-6">
    
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
      <div class="flex items-center gap-2">
        <Heart class="w-6 h-6 text-red-500 fill-red-500" />
        <h1 class="text-2xl font-bold tracking-tight">Favori Filmlerim</h1>
      </div>
      <span class="text-sm text-slate-500 dark:text-slate-400">
        {{ favoritesStore.favorites.length }} film
      </span>
    </div>

    <!-- Boş Durum -->
    <div
      v-if="favoritesStore.favorites.length === 0"
      class="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/50 space-y-3"
    >
      <Film class="w-12 h-12 text-slate-400 mx-auto" />
      <h3 class="text-lg font-bold">Henüz favori film eklemediniz</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
        Beğendiğiniz filmleri kalp ikonuna tıklayarak favorilerinize ekleyebilir ve daha sonra buradan kolayca ulaşabilirsiniz.
      </p>
      <RouterLink
        to="/"
        class="inline-block mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-semibold rounded-lg transition-colors"
      >
        Filmleri Keşfet
      </RouterLink>
    </div>

    <!-- Favori Filmler Listesi -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
    >
      <MovieCard
        v-for="movie in favoritesStore.favorites"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </section>
</template>