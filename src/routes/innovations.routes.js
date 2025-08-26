const express = require('express');
const createContentController = require('../controllers/content.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBasicContent } = require('../middlewares/validation.middleware');

const router = express.Router();
const innovationController = createContentController('Innovation', 'innovation');

/**
 * @swagger
 * /api/innovations:
 *   get:
 *     summary: Tüm inovasyonları listele
 *     description: Klinik inovasyonlarının listesini getirir
 *     tags: [Innovation]
 *     responses:
 *       200:
 *         description: İnovasyon listesi
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
 *                     $ref: '#/components/schemas/Innovation'
 *   post:
 *     summary: Yeni inovasyon ekle
 *     description: Yeni inovasyon kaydı oluşturur (Admin)
 *     tags: [Innovation]
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
 *                 example: "Robotik Cerrahi Sistemi"
 *               content:
 *                 type: string
 *                 example: "<p>Yeni nesil robotik cerrahi sistemi ile daha hassas ve güvenli operasyonlar gerçekleştiriyoruz...</p>"
 *               type:
 *                 type: string
 *                 enum: [podcast, video, article, research]
 *                 example: "podcast"
 *               category:
 *                 type: string
 *                 enum: [support, education, research, technology]
 *                 example: "support"
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 *                 example: "archived"
 *               team:
 *                 type: string
 *                 example: "Dr. Mehmet Yılmaz Ekibi"
 *               startDate:
 *                 type: string
 *                 example: "2024-01-15"
 *               image:
 *                 type: string
 *                 example: "https://example.com/innovation-image.jpg"
 *               tags:
 *                 type: string
 *                 example: "robotik,cerrahi,teknoloji,inovasyon"
 *     responses:
 *       201:
 *         description: İnovasyon başarıyla oluşturuldu
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
 *                   $ref: '#/components/schemas/Innovation'
 *       401:
 *         description: Yetkisiz erişim
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', innovationController.getAll);
router.post('/', requireAuth, validateBasicContent, innovationController.create);

/**
 * @swagger
 * /api/innovations/{id}:
 *   get:
 *     summary: İnovasyon detayı
 *     description: Belirli bir inovasyonun detay bilgilerini getirir
 *     tags: [Innovation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: İnovasyon ID
 *     responses:
 *       200:
 *         description: İnovasyon detayı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Innovation'
 *       404:
 *         description: İnovasyon bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: İnovasyon bilgilerini güncelle
 *     description: İnovasyon bilgilerini günceller (Admin)
 *     tags: [Innovation]
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
 *                 example: "Güncellenmiş Robotik Sistem"
 *               content:
 *                 type: string
 *                 example: "<p>Güncellenmiş inovasyon açıklaması...</p>"
 *               type:
 *                 type: string
 *                 enum: [podcast, video, article, research]
 *                 example: "video"
 *               category:
 *                 type: string
 *                 enum: [support, education, research, technology]
 *                 example: "technology"
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 *                 example: "published"
 *               team:
 *                 type: string
 *                 example: "Dr. Mehmet Yılmaz Ekibi"
 *               startDate:
 *                 type: string
 *                 example: "2024-01-15"
 *               image:
 *                 type: string
 *                 example: "https://example.com/innovation-image.jpg"
 *               tags:
 *                 type: string
 *                 example: "robotik,cerrahi,teknoloji,inovasyon"
 *     responses:
 *       200:
 *         description: İnovasyon başarıyla güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: İnovasyon bulunamadı
 *   delete:
 *     summary: İnovasyonu sil
 *     description: İnovasyon kaydını siler (Admin)
 *     tags: [Innovation]
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
 *         description: İnovasyon başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: İnovasyon bulunamadı
 */
router.get('/:id', innovationController.getById);
router.put('/:id', requireAuth, validateBasicContent, innovationController.update);
router.delete('/:id', requireAuth, innovationController.delete);

module.exports = router;
