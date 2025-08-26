const express = require('express');
const createContentController = require('../controllers/content.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBasicContent } = require('../middlewares/validation.middleware');

const router = express.Router();
const mediaController = createContentController('MediaItem', 'mediaItem');

/**
 * @swagger
 * /api/media:
 *   get:
 *     summary: Tüm medya içeriklerini listele
 *     description: Klinik medya içeriklerinin (video, görsel vb.) listesini getirir
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: Medya içerikleri listesi
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
 *                     $ref: '#/components/schemas/MediaItem'
 *   post:
 *     summary: Yeni medya içeriği ekle
 *     description: Yeni medya içeriği kaydı oluşturur (Admin)
 *     tags: [Media]
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
 *                 example: "Minimal İnvaziv Lomber Füzyon Ameliyatı"
 *               description:
 *                 type: string
 *                 example: "Prof. Dr. Mehmet Yılmaz tarafından gerçekleştirilen minimal invaziv lomber füzyon ameliyatının detaylı anlatımı."
 *               content:
 *                 type: string
 *                 example: "Bu videoda minimal invaziv omurga cerrahisi tekniği gösterilmektedir..."
 *               type:
 *                 type: string
 *                 enum: [video, image, podcast, webinar]
 *                 example: "video"
 *               url:
 *                 type: string
 *                 example: "https://youtube.com/watch?v=abc123xyz"
 *               thumbnail:
 *                 type: string
 *                 example: "https://example.com/media/thumbnails/fusion-surgery.jpg"
 *               publishDate:
 *                 type: string
 *                 example: "2024-03-15"
 *               category:
 *                 type: string
 *                 enum: [education, surgery, research, patient, conference]
 *                 example: "surgery"
 *               status:
 *                 type: string
 *                 enum: [published, draft, archived]
 *                 example: "published"
 *     responses:
 *       201:
 *         description: Medya içeriği başarıyla oluşturuldu
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
 *                   $ref: '#/components/schemas/MediaItem'
 *       401:
 *         description: Yetkisiz erişim
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', mediaController.getAll);
router.post('/', requireAuth, validateBasicContent, mediaController.create);

/**
 * @swagger
 * /api/media/{id}:
 *   get:
 *     summary: Medya içeriği detayı
 *     description: Belirli bir medya içeriğinin detay bilgilerini getirir
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Medya içeriği ID
 *     responses:
 *       200:
 *         description: Medya içeriği detayı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/MediaItem'
 *       404:
 *         description: Medya içeriği bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Medya içeriği bilgilerini güncelle
 *     description: Medya içeriği bilgilerini günceller (Admin)
 *     tags: [Media]
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
 *                 example: "Minimal İnvaziv Lomber Füzyon Ameliyatı"
 *               description:
 *                 type: string
 *                 example: "Prof. Dr. Mehmet Yılmaz tarafından gerçekleştirilen minimal invaziv lomber füzyon ameliyatının detaylı anlatımı."
 *               content:
 *                 type: string
 *                 example: "Bu videoda minimal invaziv omurga cerrahisi tekniği gösterilmektedir..."
 *               type:
 *                 type: string
 *                 enum: [video, image, podcast, webinar]
 *                 example: "video"
 *               url:
 *                 type: string
 *                 example: "https://youtube.com/watch?v=abc123xyz"
 *               thumbnail:
 *                 type: string
 *                 example: "https://example.com/media/thumbnails/fusion-surgery.jpg"
 *               publishDate:
 *                 type: string
 *                 example: "2024-03-15"
 *               category:
 *                 type: string
 *                 enum: [education, surgery, research, patient, conference]
 *                 example: "surgery"
 *               status:
 *                 type: string
 *                 enum: [published, draft, archived]
 *                 example: "published"
 *     responses:
 *       200:
 *         description: Medya içeriği başarıyla güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Medya içeriği bulunamadı
 *   delete:
 *     summary: Medya içeriğini sil
 *     description: Medya içeriği kaydını siler (Admin)
 *     tags: [Media]
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
 *         description: Medya içeriği başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Medya içeriği bulunamadı
 */
router.get('/:id', mediaController.getById);
router.put('/:id', requireAuth, validateBasicContent, mediaController.update);
router.delete('/:id', requireAuth, mediaController.delete);

module.exports = router;
