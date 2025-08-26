const express = require('express');
const createContentController = require('../controllers/content.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBasicContent } = require('../middlewares/validation.middleware');

const router = express.Router();
const newsController = createContentController('News', 'news');

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Tüm haberleri listele
 *     description: Klinik haberlerinin listesini getirir
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Haber listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
 *   post:
 *     summary: Yeni haber ekle
 *     description: Yeni haber kaydı oluşturur (Admin)
 *     tags: [News]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yeni Tedavi Merkezimiz Açıldı"
 *               content:
 *                 type: string
 *                 example: "Modern teknoloji ile donatılmış yeni tedavi merkezimiz hastalarımızın hizmetinde..."
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/news-image.jpg"
 *     responses:
 *       201:
 *         description: Haber başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/News'
 *       401:
 *         description: Yetkisiz erişim
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', newsController.getAll);
router.post('/', requireAuth, validateBasicContent, newsController.create);

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Haber detayı
 *     description: Belirli bir haberin detay bilgilerini getirir
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Haber ID
 *     responses:
 *       200:
 *         description: Haber detayı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/News'
 *       404:
 *         description: Haber bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Haber bilgilerini güncelle
 *     description: Haber bilgilerini günceller (Admin)
 *     tags: [News]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Güncellenmiş Haber Başlığı"
 *               content:
 *                 type: string
 *                 example: "Güncellenmiş haber içeriği..."
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/updated-news.jpg"
 *     responses:
 *       200:
 *         description: Haber başarıyla güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Haber bulunamadı
 *   delete:
 *     summary: Haberi sil
 *     description: Haber kaydını siler (Admin)
 *     tags: [News]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Haber başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Haber bulunamadı
 */
router.get('/:id', newsController.getById);
router.put('/:id', requireAuth, validateBasicContent, newsController.update);
router.delete('/:id', requireAuth, newsController.delete);

module.exports = router;
