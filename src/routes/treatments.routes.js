const express = require('express');
const createContentController = require('../controllers/content.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateTreatment } = require('../middlewares/validation.middleware');

const router = express.Router();
const treatmentController = createContentController('Treatment', 'treatment');

/**
 * @swagger
 * /api/treatments:
 *   get:
 *     summary: Tüm tedavileri listele
 *     description: Klinik tedavi yöntemlerinin listesini getirir
 *     tags: [Treatments]
 *     responses:
 *       200:
 *         description: Tedavi listesi
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
 *                     $ref: '#/components/schemas/Treatment'
 *   post:
 *     summary: Yeni tedavi ekle
 *     description: Yeni tedavi yöntemi oluşturur (Admin)
 *     tags: [Treatments]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, slug]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Minimal İnvaziv Cerrahi"
 *               slug:
 *                 type: string
 *                 example: "minimal-invaziv-cerrahi"
 *               summary:
 *                 type: string
 *                 example: "Daha az kesi, daha hızlı iyileşme"
 *               content:
 *                 type: string
 *                 example: "Detaylı tedavi açıklaması..."
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/treatment.jpg"
 *     responses:
 *       201:
 *         description: Tedavi başarıyla oluşturuldu
 *       401:
 *         description: Yetkisiz erişim
 */
router.get('/', treatmentController.getAll);
router.post('/', requireAuth, validateTreatment, treatmentController.create);

/**
 * @swagger
 * /api/treatments/{slug}:
 *   get:
 *     summary: Tedavi detayı (slug ile)
 *     description: Belirli bir tedavinin detay bilgilerini slug ile getirir
 *     tags: [Treatments]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Tedavi slug (örn. omurga-stabilizasyonu)
 *     responses:
 *       200:
 *         description: Tedavi detayı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Treatment'
 *       404:
 *         description: Tedavi bulunamadı
 */
router.get('/:slug', treatmentController.getBySlug);

/**
 * @swagger
 * /api/treatments/id/{id}:
 *   put:
 *     summary: Tedavi bilgilerini güncelle
 *     description: Tedavi bilgilerini günceller (Admin)
 *     tags: [Treatments]
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
 *               slug:
 *                 type: string
 *               summary:
 *                 type: string
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tedavi başarıyla güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Tedavi bulunamadı
 *   delete:
 *     summary: Tedaviyi sil
 *     description: Tedavi kaydını siler (Admin)
 *     tags: [Treatments]
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
 *         description: Tedavi başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Tedavi bulunamadı
 */
router.put('/:id', requireAuth, validateTreatment, treatmentController.update);
router.delete('/:id', requireAuth, treatmentController.delete);

module.exports = router;
