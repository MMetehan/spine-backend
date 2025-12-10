const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Generate sitemap.xml for SEO
 * @route GET /sitemap.xml
 */
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://anatolianspine.com';

    // Veritabanından tüm içerikleri çek (filtreleme YOK)
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
      prisma.treatment.findMany({ select: { slug: true, createdAt: true } }),
      prisma.team.findMany({ select: { id: true, createdAt: true } }),
      prisma.research.findMany({ select: { id: true, createdAt: true } }),
      prisma.innovation.findMany({ select: { id: true, createdAt: true } }),
      prisma.education.findMany({ select: { id: true, createdAt: true } }),
      prisma.mediaItem.findMany({ select: { id: true, createdAt: true } }),
      prisma.sponsor.findMany({ select: { id: true, createdAt: true } }),
      prisma.project.findMany({ select: { id: true, createdAt: true } }),
      prisma.news.findMany({ select: { id: true, createdAt: true } }),
    ]);

    // Statik sayfalar
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily', lastmod: new Date() },
      { url: '/about', priority: '0.9', changefreq: 'monthly', lastmod: new Date() },
      { url: '/team', priority: '0.8', changefreq: 'weekly', lastmod: new Date() },
      { url: '/treatments', priority: '0.9', changefreq: 'weekly', lastmod: new Date() },
      { url: '/research', priority: '0.9', changefreq: 'weekly', lastmod: new Date() },
      { url: '/innovation', priority: '0.8', changefreq: 'weekly', lastmod: new Date() },
      { url: '/education', priority: '0.8', changefreq: 'weekly', lastmod: new Date() },
      { url: '/media', priority: '0.7', changefreq: 'weekly', lastmod: new Date() },
      { url: '/sponsors', priority: '0.7', changefreq: 'monthly', lastmod: new Date() },
      { url: '/projects', priority: '0.8', changefreq: 'weekly', lastmod: new Date() },
      { url: '/news', priority: '0.8', changefreq: 'daily', lastmod: new Date() },
      { url: '/appointment', priority: '0.9', changefreq: 'monthly', lastmod: new Date() },
      { url: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: new Date() },
      { url: '/faq', priority: '0.7', changefreq: 'monthly', lastmod: new Date() },
    ];

    // XML header
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Statik sayfalar ekle
    staticPages.forEach((page) => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${page.lastmod.toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Helper function: Dinamik sayfalar ekle
    const addDynamicPages = (items, pathPrefix, priority, changefreq, useSlug = false) => {
      items.forEach((item) => {
        const itemPath = useSlug ? item.slug : item.id;
        const lastmod = item.createdAt || new Date(); // updatedAt yoksa createdAt kullan
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${pathPrefix}/${itemPath}</loc>\n`;
        xml += `    <lastmod>${lastmod.toISOString().split('T')[0]}</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += '  </url>\n';
      });
    };

    // Tüm dinamik sayfaları ekle
    addDynamicPages(treatments, '/treatments', '0.7', 'monthly', true); // slug kullan
    addDynamicPages(team, '/team', '0.6', 'monthly'); // id kullan
    addDynamicPages(research, '/research', '0.8', 'monthly');
    addDynamicPages(innovations, '/innovation', '0.7', 'monthly');
    addDynamicPages(education, '/education', '0.7', 'monthly');
    addDynamicPages(media, '/media', '0.6', 'weekly');
    addDynamicPages(sponsors, '/sponsors', '0.5', 'yearly');
    addDynamicPages(projects, '/projects', '0.7', 'monthly');
    addDynamicPages(news, '/news', '0.6', 'monthly');

    xml += '</urlset>';

    // XML response
    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=3600'); // 1 saat cache
    res.send(xml);
  } catch (error) {
    console.error('❌ Sitemap generation error:', error);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Sitemap generation failed</error>');
  }
});

/**
 * Generate robots.txt for SEO
 * @route GET /robots.txt
 */
router.get('/robots.txt', (req, res) => {
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

  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=86400'); // 24 saat cache
  res.send(robotsTxt);
});

module.exports = router;