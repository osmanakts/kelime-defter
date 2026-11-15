# 📚 VocabVault - Kelime ve Kavram Defteri

Modern web geliştirme eğitimi kapsamında yapay zeka destekli olarak geliştirilmiş, kullanıcıların yabancı dil kelimelerini veya teknik kavramları kategorize ederek kaydedebildiği bir web uygulamasıdır.

## 📸 Ekran Görüntüsü
![Uygulama Ekran Görüntüsü](./screenshot.png)

## 🚀 Canlı Demo
Uygulamanın çalışan haline buradan ulaşabilirsiniz: **[Canlı Demo Linki Buraya Gelecek]**

## 🛠️ Kullanılan Teknolojiler
* **Çatı / Kütüphane:** React 18 (Vite ile oluşturuldu)
* **Stil:** Tailwind CSS
* **Veri Saklama:** Tarayıcı `LocalStorage` API
* **İkonlar:** Lucide React
* **Yapay Zeka Araçları:** Gemini (Mimari planlama, bileşen üretimi ve dokümantasyon)

## 🤖 Yapay Zeka Geliştirme Sürecinde Nasıl Kullanıldı?
1. **Planlama ve Veri Modeli:** Uygulamanın sahip olması gereken özellikler, ekran bileşenleri ve `LocalStorage` üzerinde tutulacak JSON veri şeması yapay zeka ile birlikte kurgulandı.
2. **Bileşen ve Arayüz Üretimi:** React `useState` ve `useEffect` hook'ları kullanılarak CRUD (Ekleme, Listeleme, Durum Güncelleme, Silme) işlemlerini yürüten bileşen kodları ve Tailwind CSS tabanlı duyarlı (responsive) arayüz tasarımı oluşturuldu.
3. **Filtreleme Mantığı:** Çoklu filtreleme (arama metni, kategori ve öğrenilme durumu) algoritmasının hatasız çalışması için yapay zekadan kod optimizasyonu desteği alındı.
4. **Dokümantasyon:** Proje teslim standartlarına uygun README taslağı hazırlandı.

## 💻 Kurulum ve Çalıştırma Adımları
1. Depoyu klonlayın: `git clone <sizin-github-repo-linkiniz>`
2. Proje dizinine gidin: `cd kelime-defter`
3. Gerekli paketleri yükleyin: `npm install`
4. Geliştirme sunucusunu başlatın: `npm run dev`