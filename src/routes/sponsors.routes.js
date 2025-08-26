const express = require('express');
const createContentController = require('../controllers/content.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBasicContent } = require('../middlewares/validation.middleware');

const router = express.Router();
const sponsorController = createContentController('Sponsor', 'sponsor');

/**
 * @swagger
 * /api/sponsors:
 *   get:
 *     summary: Tüm sponsorları listele
 *     description: Klinik sponsorlarının listesini getirir
 *     tags: [Sponsors]
 *     responses:
 *       200:
 *         description: Sponsor listesi
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
 *                     $ref: '#/components/schemas/Sponsor'
 *   post:
 *     summary: Yeni sponsor ekle
 *     description: Yeni sponsor kaydı oluşturur (Admin)
 *     tags: [Sponsors]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Medtronic Türkiye"
 *               description:
 *                 type: string
 *                 example: "Türkiye'nin önde gelen tıbbi teknoloji şirketi"
 *               logo:
 *                 type: string
 *                 example: "https://example.com/logos/medtronic.png"
 *               website:
 *                 type: string
 *                 example: "https://www.medtronic.com/tr"
 *               category:
 *                 type: string
 *                 enum: [technology, pharmaceutical, equipment, research, support]
 *                 example: "technology"
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending]
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Sponsor başarıyla oluşturuldu
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
 *                   $ref: '#/components/schemas/Sponsor'
 *       401:
 *         description: Yetkisiz erişim
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', sponsorController.getAll);
router.post('/', requireAuth, validateBasicContent, sponsorController.create);

/**
 * @swagger
 * /api/sponsors/{id}:
 *   get:
 *     summary: Sponsor detayı
 *     description: Belirli bir sponsorun detay bilgilerini getirir
 *     tags: [Sponsors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sponsor ID
 *     responses:
 *       200:
 *         description: Sponsor detayı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Sponsor'
 *       404:
 *         description: Sponsor bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Sponsor bilgilerini güncelle
 *     description: Sponsor bilgilerini günceller (Admin)
 *     tags: [Sponsors]
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
 *               name:
 *                 type: string
 *                 example: "Medtronic Türkiye"
 *               description:
 *                 type: string
 *                 example: "Türkiye'nin önde gelen tıbbi teknoloji şirketi"
 *               logo:
 *                 type: string
 *                 example: "https://example.com/logos/medtronic.png"
 *               website:
 *                 type: string
 *                 example: "https://www.medtronic.com/tr"
 *               category:
 *                 type: string
 *                 enum: [technology, pharmaceutical, equipment, research, support]
 *                 example: "technology"
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending]
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Sponsor başarıyla güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Sponsor bulunamadı
 *   delete:
 *     summary: Sponsoru sil
 *     description: Sponsor kaydını siler (Admin)
 *     tags: [Sponsors]
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
 *         description: Sponsor başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Sponsor bulunamadı
 */
router.get('/:id', sponsorController.getById);
router.put('/:id', requireAuth, validateBasicContent, sponsorController.update);
router.delete('/:id', requireAuth, sponsorController.delete);

module.exports = router;
