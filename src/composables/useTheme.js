import { ref, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const initTheme = () => {
    const savedTheme = localStorage.getItem('movie_app_theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('movie_app_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('movie_app_theme', 'light')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleTheme
  }
}