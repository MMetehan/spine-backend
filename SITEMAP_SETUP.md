# Sitemap Setup - Railway Backend + Cloudflare Frontend

## 🎯 Yapılandırma

### 1️⃣ Backend'de Sitemap Endpoint Oluştur (Railway)

Backend projenize şu dosyayı ekleyin:

```javascript
// routes/sitemap.js veya routes/public.js
const express = require("express");
const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = "https://anatolianspine.com";

    // Veritabanından içerikleri çek
    const [
      treatments,
      team,
      research,
      innovations,
      education,
      media,
      sponsors,
      projects,
      news,
    ] = await Promise.all([
      Treatment.find({ status: "published" }).select("slug updatedAt"),
      TeamMember.find({ status: "active" }).select("_id updatedAt"),
      Research.find({ status: "published" }).select("_id updatedAt"),
      Innovation.find({ status: "published" }).select("_id updatedAt"),
      Education.find({ status: "published" }).select("_id updatedAt"),
      Media.find({ status: "published" }).select("_id updatedAt"),
      Sponsor.find({ status: "active" }).select("_id updatedAt"),
      Project.find({ status: "published" }).select("_id updatedAt"),
      News.find({ status: "published" }).select("_id updatedAt"),
    ]);

    // Statik sayfalar
    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "daily", lastmod: new Date() },
      {
        url: "/about",
        priority: "0.9",
        changefreq: "monthly",
        lastmod: new Date(),
      },
      {
        url: "/team",
        priority: "0.8",
        changefreq: "weekly",
        lastmod: new Date(),
      },
      {
        url: "/treatments",
        priority: "0.9",
        changefreq: "weekly",
        lastmod: new Date(),
      },
      {
        url: "/research",
        priority: "0.9",
        changefreq: "weekly",
        lastmod: new Date(),
      },
      {
        url: "/innovation",
        priority: "0.8",
        changefreq: "weekly",
        lastmod: new Date(),
      },
      {
        url: "/education",
        priority: "0.8",
        changefreq: "weekly",
        lastmod: new Date(),
      },
      {
        url: "/media",
        priority: "0.7",
        changefreq: "weekly",
        lastmod: new Date(),
      },
      {
        url: "/sponsors",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: new Date(),
      },
      {
        url: "/projects",
        priority: "0.8",
        changefreq: "weekly",
        lastmod: new Date(),
      },
      {
        url: "/news",
        priority: "0.8",
        changefreq: "daily",
        lastmod: new Date(),
      },
      {
        url: "/appointment",
        priority: "0.9",
        changefreq: "monthly",
        lastmod: new Date(),
      },
      {
        url: "/contact",
        priority: "0.8",
        changefreq: "monthly",
        lastmod: new Date(),
      },
      {
        url: "/faq",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: new Date(),
      },
    ];

    // XML header
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Statik sayfalar ekle
    staticPages.forEach((page) => {
      xml += "  <url>\n";
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${
        page.lastmod.toISOString().split("T")[0]
      }</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += "  </url>\n";
    });

    // Dinamik sayfalar ekle - helper function
    const addDynamicPages = (items, pathPrefix, priority, changefreq) => {
      items.forEach((item) => {
        const itemPath = pathPrefix === "/treatments" ? item.slug : item._id;
        xml += "  <url>\n";
        xml += `    <loc>${baseUrl}${pathPrefix}/${itemPath}</loc>\n`;
        xml += `    <lastmod>${
          item.updatedAt.toISOString().split("T")[0]
        }</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += "  </url>\n";
      });
    };

    // Tüm dinamik sayfaları ekle
    addDynamicPages(treatments, "/treatments", "0.7", "monthly");
    addDynamicPages(team, "/team", "0.6", "monthly");
    addDynamicPages(research, "/research", "0.8", "monthly");
    addDynamicPages(innovations, "/innovation", "0.7", "monthly");
    addDynamicPages(education, "/education", "0.7", "monthly");
    addDynamicPages(media, "/media", "0.6", "weekly");
    addDynamicPages(sponsors, "/sponsors", "0.5", "yearly");
    addDynamicPages(projects, "/projects", "0.7", "monthly");
    addDynamicPages(news, "/news", "0.6", "monthly");

    xml += "</urlset>";

    // XML response
    res.header("Content-Type", "application/xml; charset=utf-8");
    res.header("Cache-Control", "public, max-age=3600"); // 1 saat cache
    res.send(xml);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res
      .status(500)
      .send(
        '<?xml version="1.0" encoding="UTF-8"?><error>Sitemap generation failed</error>'
      );
  }
});

// robots.txt endpoint (opsiyonel)
router.get("/robots.txt", (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://anatolianspine.com/sitemap.xml

# Disallow admin pages
User-agent: *
Disallow: /admin
Disallow: /api

# Crawl delay
Crawl-delay: 1`;

  res.header("Content-Type", "text/plain; charset=utf-8");
  res.header("Cache-Control", "public, max-age=86400"); // 24 saat cache
  res.send(robotsTxt);
});

module.exports = router;
```

Backend app.js'e ekle:

```javascript
const publicRoutes = require("./routes/sitemap");
app.use("/", publicRoutes);
```

### 2️⃣ Frontend (Cloudflare) Konfigürasyonu

✅ **Zaten yapıldı!**

- `workers-site/index.js` - Sitemap proxy eklendi
- `wrangler.jsonc` - BACKEND_URL environment variable eklendi

### 3️⃣ Railway Backend URL'i Güncellendi ✅

`wrangler.jsonc` dosyasında:

```jsonc
{
  "vars": {
    "BACKEND_URL": "https://anatolian-spine-backend-production.up.railway.app"
  }
}
```

✅ Backend URL yapılandırıldı!

### 4️⃣ Deploy

```bash
# Frontend deploy (Cloudflare Pages)
npm run build
npx wrangler pages deploy dist

# Backend deploy (Railway)
git push  # Railway otomatik deploy eder
```

## 🔍 Test Et

### Local Test

```bash
# Backend'i test et
curl https://anatolian-spine-backend-production.up.railway.app/sitemap.xml

# Frontend'i test et (build sonrası)
npx wrangler pages dev dist
# Tarayıcıda: http://localhost:8788/sitemap.xml
```

### Production Test

```bash
curl https://anatolianspine.com/sitemap.xml
```

## 📊 Google Search Console'a Ekle

1. https://search.google.com/search-console
2. Property seç (anatolianspine.com)
3. Sol menüden **Sitemaps**
4. `https://anatolianspine.com/sitemap.xml` ekle
5. **GÖNDER**

## ✅ Avantajlar

✅ **Gerçek zamanlı güncelleme** - Admin panelden education eklediğinde anında sitemap'te görünür
✅ **Doğru lastmod tarihleri** - Her içeriğin gerçek güncellenme tarihi
✅ **Filtreleme** - Sadece published/active içerikler sitemap'te
✅ **Performans** - 1 saat cache ile hızlı
✅ **Otomatik** - Hiçbir manuel işlem gerekmez
✅ **Cross-domain** - Backend Railway'de, frontend Cloudflare'de sorunsuz çalışır

## 🔧 CORS Sorunu Çıkarsa

Backend'e CORS ekle:

```javascript
// Backend app.js
const cors = require("cors");
app.use(
  cors({
    origin: "https://anatolianspine.com",
    methods: ["GET"],
  })
);
```

## 📝 Notlar

- Sitemap max 50.000 URL içerebilir
- Her URL max 2048 karakter olabilir
- Büyük siteler için sitemap index kullan
- Google sitemap'i günde 1-2 kez crawl eder
- Cache süresi: sitemap 1 saat, robots.txt 24 saat

## 🚀 Sonuç

Artık:

- Admin panelden her ekleme/güncelleme otomatik sitemap'te
- Google her zaman güncel içeriği görür
- Cross-domain sorun yaratmaz
- Railway + Cloudflare mükemmel çalışır
