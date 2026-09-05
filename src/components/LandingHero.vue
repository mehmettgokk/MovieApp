<script setup>
import { ref } from 'vue'
import { Film, ChevronDown, Play, Sparkles } from 'lucide-vue-next'

const emit = defineEmits(['enter'])

const isClosing = ref(false)

const handleDismiss = () => {
  if (isClosing.value) return
  isClosing.value = true
  
  // Çıkış animasyonu tamamlandığında üst bileşene bildir
  setTimeout(() => {
    emit('enter')
  }, 650)
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-slate-950 text-white transition-all duration-700 ease-in-out select-none"
    :class="{ '-translate-y-full opacity-0 pointer-events-none': isClosing }"
    @wheel.passive="handleDismiss"
    @touchmove.passive="handleDismiss"
  >
    <!-- Efekt -->
    <div class="absolute inset-0 -z-10 pointer-events-none">
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/15 blur-[140px] rounded-full"></div>
      <div class="absolute bottom-0 right-10 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
    </div>

    <!-- Üst Başlık / Marka -->
    <header class="p-6 sm:p-10 flex items-center justify-between max-w-7xl mx-auto w-full">
      <div class="flex items-center gap-2 text-amber-500 font-black text-2xl tracking-tight">
        <Film class="w-7 h-7 animate-pulse" />
        <span>MovieFlow</span>
      </div>
      <span class="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">
        <Sparkles class="w-3 h-3" />
        TMDB Film Deneyimi
      </span>
    </header>

    <!-- Merkez Karşılama Alanı -->
    <main class="max-w-4xl mx-auto px-6 text-center space-y-8 my-auto">
      <div class="space-y-4">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Sinema Dünyasını <br />
          <span class="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
            Yeniden Keşfedin
          </span>
        </h1>
        <p class="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          En popüler yapımlar, vizyondaki en yeni filmler ve unutulmaz klasikler tek bir noktada. Listenizi oluşturun ve keşfe başlayın.
        </p>
      </div>

      <!-- Aksiyon Butonları -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          @click="handleDismiss"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all duration-300 shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Play class="w-4 h-4 fill-slate-950" />
          <span>Keşfetmeye Başla</span>
        </button>
      </div>
    </main>

    <!-- Scrollu kaydırma İpuçları -->
    <footer class="p-6 sm:p-10 flex flex-col items-center justify-center space-y-2 text-slate-400">
      <button
        @click="handleDismiss"
        class="group flex flex-col items-center gap-1.5 text-xs tracking-widest uppercase text-slate-400 hover:text-amber-400 transition-colors cursor-pointer focus:outline-none"
      >
        <span>Aşağı Kaydır</span>
        <ChevronDown class="w-5 h-5 animate-bounce text-amber-500 group-hover:translate-y-1 transition-transform" />
      </button>
    </footer>
  </div>
</template>