# 📍 Japrax AmanMap 2025
Aplikasi pemetaan keamanan untuk wilayah **Kota Jayapura**.

Japrax AmanMap adalah aplikasi mobile yang membantu masyarakat melihat **area rawan**, **rute aman**, dan akses cepat menuju fasilitas penting seperti **pos polisi** dan **rumah sakit**. Aplikasi ini dirancang agar masyarakat dapat merasa lebih aman ketika bepergian, terutama pada malam hari.

---

## 📝 Deskripsi Produk
**Japrax AmanMap** merupakan aplikasi pemetaan berbasis **SIG (Sistem Informasi Geografis)** yang menyajikan informasi spasial terkait:

- Zona rawan kejahatan
- Jalur aman
- Rute prioritas menuju pos polisi
- Rute tercepat menuju rumah sakit

Aplikasi ini dibuat dengan tampilan yang sederhana dan langsung pada inti informasi. Pengguna dapat mengetahui kondisi keamanan suatu wilayah tanpa bergantung pada cerita atau asumsi. Dengan demikian, aplikasi ini berfungsi sebagai alat bantu navigasi aman bagi masyarakat Jayapura.

---

## 🧩 Komponen Pembangun Aplikasi

### **1. Frontend (Mobile)**
Dibangun menggunakan:

- **React Native (Expo)**
- **Typescript**
- **Expo Router**
- **Expo Image**
- **Ionicons / @expo/vector-icons**
- **Custom Themed Components**:
  - `ThemedView`
  - `ThemedText`
  - `useThemeColor`
- **ParallaxScrollView** sebagai komponen tampilan beranda

Fitur UI utama:
- Hero section  
- Quick Feature Panel (Zona Rawan, Rute Polisi, Rute RS)  
- Funfact "Ko Harus Tau" dengan gaya bahasa Jayapura  
- Layout 2 kolom (Latar Belakang & Tujuan)  
- Tombol CTA menuju halaman peta  

---

### **2. Backend & GIS (Opsional)**
Jika dikembangkan lebih lanjut:

- **Node.js** untuk API backend
- **GeoServer / PostGIS** untuk hosting data spasial
- **Leaflet.js** (untuk versi web atau kebutuhan peta tambahan)

---

### **3. Data Spasial yang Digunakan**
- Titik zona rawan kejahatan malam hari
- Lokasi pos polisi terdekat
- Lokasi rumah sakit dan fasilitas kesehatan
- Jalur aman berdasarkan kondisi wilayah
- Jaringan jalan Kota Jayapura

---

## 🗂️ Sumber Data
Data dalam aplikasi diperoleh dari:

- **Wawancara online** dengan teman yang tinggal di Jayapura  
- **OpenStreetMap (OSM)**
- Observasi wilayah (data kategorisasi zona rawan)

---

## 📸 Screenshots
![home](https://github.com/user-attachments/assets/44aa46f0-253a-4ac6-ab3f-b4667e5b3263)
![Map](https://github.com/user-attachments/assets/88bcccc4-edbc-47bf-bd70-0452d3550ec2)
![gmap](https://github.com/user-attachments/assets/c99205e2-8ef1-46d2-96c3-5bd5d8b6fca5)




