# Dokumentasi Cloud Computing

Proyek ini adalah source code halaman dokumentasi tugas akhir mata kuliah Cloud Computing. Aplikasi web ini dibuat menggunakan HTML, CSS, dan JavaScript murni. 

Deployment proyek ini menggunakan Docker dan Nginx, dan akan di-host pada VPS dengan menggunakan Nginx Proxy Manager sebagai Reverse Proxy dan Portainer untuk manajemen container.

## 🚀 Persyaratan (Prerequisites)
Pastikan server/komputer Anda sudah terinstall:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🛠️ Cara Menjalankan (Deployment)

1. **Clone repository ini**
   ```bash
   git clone <URL_REPO_ANDA>
   cd tutorial-cc
   ```

2. **Jalankan dengan Docker Compose**
   Gunakan perintah berikut untuk build dan jalankan container di background:
   ```bash
   docker-compose up -d
   ```

3. **Akses Web**
   Buka browser dan akses halaman pada alamat `http://localhost:3005` (atau `http://<IP_VPS_ANDA>:3005`).

## ⚙️ Cara Menghentikan Container
Untuk mematikan aplikasi, jalankan:
```bash
docker-compose down
```

## 🌐 Teknologi yang Digunakan
- **Frontend**: HTML5, Vanilla CSS, Vanilla JavaScript
- **Web Server**: Nginx (Alpine Image)
- **Containerization**: Docker
- **Infrastruktur**: Ubuntu VPS, Portainer, Nginx Proxy Manager, Cloudflare DNS
