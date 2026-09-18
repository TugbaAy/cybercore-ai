# ⚡ CyberCore AI — Local Full-Stack AI Platform

**CyberCore AI**, bilgisayarınızda tamamen yerel (local) olarak çalışan bir Yapay Zekâ modelini (Llama 3), kurumsal düzeyde bir Java backend altyapısı (Spring Boot 3 + Spring AI) ve modern, cam efektli (glassmorphism) bir kullanıcı arayüzü (React + Tailwind CSS) ile birleştiren uçtan uca full-stack bir AI sohbet platformudur.

Sıfır API maliyeti, %100 veri gizliliği ve yüksek özelleştirilebilirlik sunacak şekilde mimarize edilmiştir.

---

## 🏗️ Proje Mimarisi (Architecture Overview)

Proje, iki ana modülden oluşmaktadır:

```text
cybercore-ai/
├── cybercore-backend/      # Spring Boot 3 + Spring AI (Port 8080)
└── cybercore-ui/           # React + Vite + Tailwind CSS (Port 5173)
```

```text
[React UI (5173)] ──(REST API / JSON)──> [Spring Boot (8080)] ──(Spring AI)──> [Ollama Llama 3 (11434)]
```

---

## 🛠️ Teknolojik Yığın (Tech Stack)

### Backend (cybercore-backend)
*   **Java 17 / Spring Boot 3.3.x:** REST API yönetimi ve bağımlılık enjeksiyonu.
*   **Spring AI (Ollama Starter):** LLM entegrasyonu için resmi Spring AI modülü.
*   **Ollama & Llama 3:** Bilgisayar donanımı üzerinde yerel çalışan 8B parametreli dil modeli.
*   **Gradle:** Proje ve bağımlılık derleme aracı.

### Frontend (cybercore-ui)
*   **React 18 & Vite:** Hızlı HMR destekli reaktif UI katmanı.
*   **Tailwind CSS:** Cyberpunk ve Glassmorphism temalı UI tasarımı.
*   **Lucide React:** Modern vektörel simge kütüphanesi.
*   **Google Fonts:** Inter ve JetBrains Mono font kombinasyonu.

---

## 🚀 Kurulum ve Çalıştırma Rehberi (Setup Guide)

### Ön Gereksinimler (Prerequisites)
*   Java 17+
*   Node.js (v18+) & npm
*   Ollama (`ollama run llama3` komutu ile Llama 3 modeli indirilmiş olmalı)

### Adım Adım Kurulum

#### 1. Yerel AI Motorunu Başlatın
Terminale şu komutu yazarak Ollama servisini hazır hale getirin:
```bash
ollama run llama3
```

#### 2. Backend Kurulumu (Cybercore)
Yeni bir terminal açın ve backend dizinine gidip uygulamayı başlatın:
```bash
cd Cybercore
./gradlew bootRun
```
> 💡 Backend varsayılan olarak `http://localhost:8080` portunda çalışacaktır.

#### 3. Frontend Kurulumu (cybercore-ui)
Ayrı bir terminal açarak frontend klasörüne gidin, paketleri yükleyin ve sunucuyu başlatın:
```bash
cd cybercore-ui
npm install
npm run dev
```
> 💡 Frontend varsayılan olarak `http://localhost:5173` adresinde ayağa kalkacaktır.

---

## 🔌 API Dokümantasyonu

### Chat Endpoint

`POST /api/chat`

Kullanıcı mesajını alır, sistem personasını ekleyerek yerel Llama 3 modeline iletir ve yanıtı döner.

#### İstek (Request Body)
```json
{
  "message": "Java ve Spring Boot arasındaki temel fark nedir?"
}
```

#### Yanıt (Response Body)
```json
{
  "response": "Spring Boot, Java dili kullanılarak geliştirilen ve Spring çatısını hızlı konfigürasyonlarla sunan bir framework'tür..."
}
```
