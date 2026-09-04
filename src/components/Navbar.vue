<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Film, Search, Sun, Moon, Heart, Menu, X } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'
import { useFavoritesStore } from '../stores/favoritesStore'

const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const favoritesStore = useFavoritesStore()

const searchQuery = ref('')
const isMobileMenuOpen = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
    searchQuery.value = ''
    isMobileMenuOpen.value = false
  }
}

const navLinks = [
  { label: 'Popüler', path: '/category/popular' },
  { label: 'En Çok Oy Alanlar', path: '/category/top_rated' },
  { label: 'Vizyondakiler', path: '/category/now_playing' },
  { label: 'Yakında', path: '/category/upcoming' }
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-4">
        
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 font-black text-xl text-amber-500 tracking-tight shrink-0">
          <Film class="w-6 h-6" />
          <span>MovieFlow</span>
        </RouterLink>

        <!-- Desktop Kategoriler -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            active-class="!text-amber-500 font-semibold"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Arama ve Butonlar -->
        <div class="flex items-center gap-3">
          <!-- Arama Input (Masaüstü) -->
          <form @submit.prevent="handleSearch" class="relative hidden sm:block w-48 lg:w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Film ara..."
              class="w-full bg-slate-100 dark:bg-slate-900 text-sm pl-9 pr-4 py-1.5 rounded-lg border border-transparent focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-400"
            />
            <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <!-- Favoriler Linki -->
          <RouterLink
            to="/favorites"
            class="relative p-2 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
            aria-label="Favoriler"
          >
            <Heart class="w-5 h-5" />
            <span
              v-if="favoritesStore.favorites.length"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
            >
              {{ favoritesStore.favorites.length }}
            </span>
          </RouterLink>

          <!-- Tema Değiştirici -->
          <button
            @click="toggleTheme"
            class="p-2 text-slate-600 dark:text-slate-300 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            aria-label="Tema Değiştir"
          >
            <Sun v-if="isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <!-- Mobil Menü Butonu -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            <X v-if="isMobileMenuOpen" class="w-6 h-6" />
            <Menu v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobil Açılır Menü -->
    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-4">
      <form @submit.prevent="handleSearch" class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Film ara..."
          class="w-full bg-slate-100 dark:bg-slate-900 text-sm pl-9 pr-4 py-2 rounded-lg border border-transparent focus:border-amber-500 focus:outline-none"
        />
        <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </form>

      <nav class="flex flex-col space-y-2">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="isMobileMenuOpen = false"
          class="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>