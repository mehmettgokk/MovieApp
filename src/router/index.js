import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Ana Sayfa - Popüler Filmler' }
  },
  {
    path: '/category/:type',
    name: 'category',
    component: () => import('../views/CategoryView.vue'),
    meta: { title: 'Kategori Filmleri' }
  },
  {
    path: '/movie/:id',
    name: 'movie-detail',
    component: () => import('../views/MovieDetailView.vue'),
    meta: { title: 'Film Detayı' }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: { title: 'Film Arama' }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/FavoritesView.vue'),
    meta: { title: 'Favori Filmlerim' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'TMDB Film Uygulaması'} | MovieFlow`
  next()
})

export default router