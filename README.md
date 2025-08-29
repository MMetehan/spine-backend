# Spine Clinic Backend

<p align="center">
  <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" width="400" alt="Spine Clinic" />
</p>
<p align="center">
  <b>Node.js + Express + Prisma + PostgreSQL</b> <br>
  <a href="https://github.com/MMetehan/spine-backend"><img src="https://img.shields.io/github/stars/MMetehan/spine-backend?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/MMetehan/spine-backend"><img src="https://img.shields.io/github/issues/MMetehan/spine-backend" alt="GitHub issues"></a>
  <a href="https://github.com/MMetehan/spine-backend"><img src="https://img.shields.io/github/license/MMetehan/spine-backend" alt="License"></a>
</p>

---

## 🇹🇷 Türkçe

### 🚀 Özellikler
- Modern RESTful API
- Admin paneli ve oturum yönetimi (PostgreSQL tabanlı session)
- Tüm içerik türleri için CRUD
- Randevu ve iletişim formları (e-posta ile)
- Swagger/OpenAPI dokümantasyonu
- Güvenlik: CORS, rate limit, helmet
- PostgreSQL ile ölçeklenebilir ve güvenli altyapı

### 📦 Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Veritabanı migrasyonunu uygula
npx prisma migrate deploy

# Seed verisi ekle (isteğe bağlı)
npm run seed

# Geliştirme sunucusunu başlat
npm run dev
```
> **Not:** `.env` dosyanızda `DATABASE_URL` olarak PostgreSQL bağlantı adresini kullanın.

### 🗂 API Endpointleri
- `/api/admin` - Admin işlemleri
- `/api/team` - Doktorlar
- `/api/treatments` - Tedaviler
- `/api/projects` - Projeler
- `/api/sponsors` - Sponsorlar
- `/api/researches` - Araştırmalar
- `/api/media` - Medya içerikleri
- `/api/innovations` - İnovasyonlar
- `/api/news` - Haberler
- `/api/faq` - Sık Sorulan Sorular
- `/api/contact` - İletişim formu
- `/api/appointment` - Randevu formu

Swagger dokümantasyonu: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

### 👨‍💻 Geliştirici Bilgisi
- Node.js 18+
- Express.js
- Prisma ORM
- PostgreSQL
- Swagger

---

## 🇬🇧 English

### 🚀 Features
- Modern RESTful API
- Admin panel & session management (PostgreSQL-based session)
- CRUD for all content types
- Appointment & contact forms (with email)
- Swagger/OpenAPI documentation
- Security: CORS, rate limit, helmet
- Scalable and secure infrastructure with PostgreSQL

### 📦 Setup
```bash
# Install dependencies
npm install

# Apply database migrations
npx prisma migrate deploy

# Seed data (optional)
npm run seed

# Start development server
npm run dev
```
> **Note:** Use your PostgreSQL connection string as `DATABASE_URL` in your `.env` file.

### 🗂 API Endpoints
- `/api/admin` - Admin operations
- `/api/team` - Doctors
- `/api/treatments` - Treatments
- `/api/projects` - Projects
- `/api/sponsors` - Sponsors
- `/api/researches` - Researches
- `/api/media` - Media items
- `/api/innovations` - Innovations
- `/api/news` - News
- `/api/faq` - Frequently Asked Questions
- `/api/contact` - Contact form
- `/api/appointment` - Appointment form

Swagger documentation: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

### 👨‍💻 Developer Info
- Node.js 18+
- Express.js
- Prisma ORM
- PostgreSQL
- Swagger

---

## 📄 Lisans / License
MIT

---

> Spine Clinic Backend - Modern, secure and scalable API for spine clinic
