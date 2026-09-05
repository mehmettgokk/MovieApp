# TMDB Film Uygulaması

Vue 3, Pinia ve Tailwind CSS kullanılarak geliştirilmiş TMDB API tabanlı film keşif uygulaması.

## Tamamlanan Özellikler

### Temel İsterler
- **Ana Sayfa:** Popüler filmlerin kartlar halinde listelenmesi
- **Film Kartı:** Film posteri, başlık, yayın tarihi ve puan bilgisi
- **Film Detay Sayfası:** Geniş arka plan (backdrop), poster, başlık, özet, türler, süre, yayın tarihi ve puan
- **Film Arama:** Arama çubuğu ile film arama ve sonuç sayfası
- **Kategoriler:** Popüler, En Çok Oy Alanlar, Vizyondakiler ve Yakında sayfaları
- **Sayfalama :** Listeleme ve arama sonuçlarında sayfa geçişleri
- **Yüklenme Durumu:** Veri çekilirken gösterilen iskelet (skeleton) animasyonları
- **Responsive Tasarım:** Mobil ve masaüstü uyumlu arayüz

### Bonus Özellikler
- **Favori Yönetimi:** Filmleri favorilere ekleme/çıkarma ve listeleme
- **LocalStorage Desteği:** Favori filmlerin ve seçilen temanın tarayıcıda saklanması
- **Dark / Light Mod:** Koyu ve açık tema desteği
- **Benzer Filmler:** Film detay sayfasında ilgili benzer filmlerin listelenmesi
- **Türe Göre Filtreleme:** Ana sayfada aksiyon, komedi vb. türlere göre listeleme
- **Karşılama Ekranı (Landing Hero):** Açılışta kaydırma animasyonlu karşılama ekranı

## Kullanılan Teknolojiler

- **Vue 3** (Composition API)
- **Vite**
- **Pinia** (State Management)
- **Vue Router** (Yönlendirme)
- **Axios** (API Servis Katmanı & Interceptors)
- **Tailwind CSS** (Stil)
- **Lucide Vue Next** (İkonlar)

## Proje Klasör Yapısı

```text
src/
├── components/     # Navbar, Film Kartı, Pagination, Skeleton vb.
├── composables/    # Dark mode yönetimi (useTheme)
├── router/         # Rota tanımları (Kategoriler, Detay, Arama, Favoriler)
├── services/       # Axios instance ve TMDB servis metodları
├── stores/         # Pinia store'ları (movieStore, favoritesStore)
├── utils/          # Yardımcı fonksiyonlar ve URL formatlayıcılar
├── views/          # Sayfa görünümleri
├── App.vue         # Kök bileşen
└── main.js         # Uygulama başlangıcı
```
## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Ana dizinde `.env` dosyasını oluşturup TMDB API anahtarınızı girin:
```env
VITE_TMDB_API_KEY=API_KEYINIZ
VITE_TMDB_BASE_URL=[https://api.themoviedb.org/3](https://api.themoviedb.org/3)
VITE_TMDB_IMAGE_BASE_URL=[https://image.tmdb.org/t/p](https://image.tmdb.org/t/p)
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Canlı sürüm (Production Build) derlemesi almak için:
```bash
npm run build
```