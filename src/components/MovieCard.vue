<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Star, Heart } from 'lucide-vue-next'
import { getPosterUrl, formatDate } from '../utils/constants'
import { useFavoritesStore } from '../stores/favoritesStore'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const favoritesStore = useFavoritesStore()

const isFav = computed(() => favoritesStore.isFavorite(props.movie.id))

const goToDetail = () => {
  router.push(`/movie/${props.movie.id}`)
}

const handleFavoriteClick = (e) => {
  e.stopPropagation()
  favoritesStore.toggleFavorite(props.movie)
}
</script>

<template>
  <div
    @click="goToDetail"
    class="group relative flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-800 hover:-translate-y-1.5"
  >
    <!-- Poster Görseli -->
    <div class="relative aspect-[2/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
      <img
        :src="getPosterUrl(movie.poster_path)"
        :alt="movie.title"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <!-- Puan Rozeti -->
      <div class="absolute top-3 left-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
        <Star class="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
        <span>{{ movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A' }}</span>
      </div>

      <!-- Favori Butonu -->
      <button
        @click="handleFavoriteClick"
        :aria-label="isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'"
        class="absolute top-3 right-3 p-2 rounded-lg bg-slate-900/70 backdrop-blur-md text-white hover:text-red-500 transition-colors shadow-md group/btn"
      >
        <Heart
          class="w-4 h-4 transition-transform duration-200 group-active/btn:scale-125"
          :class="{ 'fill-red-500 text-red-500': isFav }"
        />
      </button>
    </div>

    <!-- Film Bilgileri -->
    <div class="p-4 flex flex-col flex-grow justify-between">
      <div>
        <h3 class="font-bold text-base line-clamp-1 group-hover:text-amber-500 transition-colors" :title="movie.title">
          {{ movie.title }}
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {{ formatDate(movie.release_date) }}
        </p>
      </div>
    </div>
  </div>
</template>