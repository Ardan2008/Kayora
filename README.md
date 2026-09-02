# Kayora

**Kayora** adalah frontend e-commerce furniture modern yang dibangun menggunakan **Vue 3** dan **Vite**. Proyek ini menyediakan antarmuka yang bersih, responsif, dan ramah pengguna untuk menelusuri dan mengeksplorasi produk furniture.

Versi saat ini berfokus pada pengalaman frontend dan menggunakan **dummy/static data** untuk mensimulasikan informasi produk dan interaksi pengguna.

> **Status Proyek:** Frontend Development

## Live Demo

[**Lihat Kayora — Live Demo**](https://kayora-furniture.vercel.app/)

## Overview

Kayora adalah konsep website e-commerce furniture yang dirancang untuk memberikan pengalaman belanja yang modern dan sederhana.

Antarmuka dibangun dengan Vue 3 menggunakan pendekatan berbasis komponen, dengan fokus pada layout responsif, penyajian produk, navigasi, dan elemen belanja interaktif.

Pada tahap pengembangan saat ini, informasi produk dan katalog dikelola menggunakan data statis pada frontend.

## Fitur

### Katalog Produk

Menampilkan produk furniture dalam katalog yang terorganisir, memungkinkan pengguna menelusuri produk yang tersedia.

### Kategori Produk

Mengelompokkan produk furniture ke dalam kategori untuk memudahkan pencarian produk.

### Search

Menyediakan antarmuka pencarian frontend untuk menemukan produk dalam katalog yang tersedia.

### Wishlist

Menyediakan interaksi wishlist untuk menyimpan produk di sisi klien (client-side).

### Shopping Cart

Memungkinkan pengguna menambahkan dan mengelola produk furniture pilihan melalui shopping cart frontend.

### Featured Products

Menyoroti produk furniture pilihan di berbagai bagian utama website.

### Responsive Design

Dirancang untuk memberikan pengalaman yang konsisten di berbagai ukuran layar desktop, tablet, dan mobile.

### Client-Side Navigation

Menggunakan Vue Router untuk navigasi antar halaman dan bagian aplikasi.

## Tech Stack

| Teknologi         | Fungsi                             |
| ----------------- | ----------------------------------- |
| **Vue 3**          | Framework frontend                  |
| **Vite**           | Development server dan build tool   |
| **JavaScript**     | Logika aplikasi                     |
| **HTML5**          | Struktur halaman                    |
| **CSS3**           | Styling dan desain responsif        |
| **Vue Router**     | Client-side routing                 |
| **Lucide Icons**   | Ikon antarmuka pengguna             |

## Data

Kayora saat ini menggunakan **dummy/static data** untuk produk dan konten katalognya.

Struktur frontend dirancang agar data statis tersebut nantinya dapat digantikan dengan data dari backend API.

```text
Vue 3 Application
│
├── Components
├── Views
├── Vue Router
└── Dummy Data
```

## Struktur Proyek

```text
Kayora/
├── public/
│   └── assets/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── App.vue
│   └── main.js
│
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

Proyek ini menggunakan struktur berbasis komponen untuk menjaga antarmuka tetap terorganisir dan dapat digunakan kembali.

## Instalasi

### Prasyarat

Pastikan hal berikut sudah terpasang:

* Node.js
* npm
* Git

### Clone Repository

```bash
git clone https://github.com/Ardan2008/Kayora.git
```

### Masuk ke Direktori Proyek

```bash
cd Kayora
```

### Install Dependencies

```bash
npm install
```

## Development

Jalankan development server:

```bash
npm run dev
```

Aplikasi akan tersedia melalui URL lokal yang disediakan oleh Vite.

Proyek ini mendukung **Hot Module Replacement (HMR)**, sehingga perubahan langsung terlihat selama development.

## Production Build

Buat production build:

```bash
npm run build
```

Preview production build secara lokal:

```bash
npm run preview
```

## Cakupan Saat Ini

Versi Kayora saat ini berfokus khusus pada pengalaman e-commerce frontend.

Yang sudah diimplementasikan:

* Katalog produk furniture
* Kategori produk
* Antarmuka pencarian produk
* Featured products
* Antarmuka wishlist
* Antarmuka shopping cart
* Layout responsif
* Navigasi client-side
* Data produk statis/dummy

Layanan backend, integrasi database, autentikasi, data pengguna yang persisten, checkout, dan pemrosesan pembayaran belum menjadi bagian dari versi saat ini.

## Pengembangan Selanjutnya

Proyek ini dapat dikembangkan lebih lanjut dengan:

* Integrasi backend API
* Integrasi database
* Autentikasi pengguna
* Shopping cart yang persisten
* Wishlist yang persisten
* Manajemen produk
* Manajemen pesanan
* Sistem checkout
* Integrasi payment gateway
* Admin dashboard

## Informasi Proyek

| Informasi        | Detail                          |
| ----------------- | -------------------------------- |
| **Proyek**         | Kayora                           |
| **Tipe**           | Furniture E-Commerce Frontend    |
| **Framework**      | Vue 3                            |
| **Build Tool**     | Vite                             |
| **Sumber Data**    | Dummy / Static Data              |
| **Status**         | Frontend Development             |

## Live Project

[**https://kayora-furniture.vercel.app/**](https://kayora-furniture.vercel.app/)