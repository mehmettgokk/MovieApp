<script setup>
import { Film } from 'lucide-vue-next'

const navLinks = [
  { label: 'Popüler', path: '/category/popular' },
  { label: 'En Çok Oy Alanlar', path: '/category/top_rated' },
  { label: 'Vizyondakiler', path: '/category/now_playing' },
  { label: 'Yakında', path: '/category/upcoming' },
  { label: 'Favorilerim', path: '/favorites' }
]
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 mt-16 text-slate-600 dark:text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
      
      <!-- Logo / Marka -->
      <RouterLink to="/" class="flex items-center gap-2 font-black text-lg text-amber-500 tracking-tight">
        <Film class="w-5 h-5" />
        <span>MovieFlow</span>
      </RouterLink>

      <!-- Sayfa Yönlendirmeleri -->
      <nav class="flex flex-wrap items-center justify-center gap-6">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="text-sm font-medium hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
        >
          {{ link.label }}
        </RouterLink>
      </nav>


    </div>
  </footer>
</template>