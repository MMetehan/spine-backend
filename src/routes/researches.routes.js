const express = require('express');
const createContentController = require('../controllers/content.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBasicContent } = require('../middlewares/validation.middleware');

const router = express.Router();
const researchController = createContentController('Research', 'research');

/**
 * @swagger
 * /api/researches:
 *   get:
 *     summary: Tüm araştırmaları listele
 *     description: Klinik araştırmalarının listesini getirir
 *     tags: [Research]
 *     responses:
 *       200:
 *         description: Araştırma listesi
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
 *                     $ref: '#/components/schemas/Research'
 *   post:
 *     summary: Yeni araştırma ekle
 *     description: Yeni araştırma kaydı oluşturur (Admin)
 *     tags: [Research]
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
 *                 example: "Omurga Cerrahisinde Yeni Yaklaşımlar"
 *               content:
 *                 type: string
 *                 example: "Bu araştırmada minimal invaziv cerrahi tekniklerin etkinliği incelenmektedir..."
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/research-image.jpg"
 *     responses:
 *       201:
 *         description: Araştırma başarıyla oluşturuldu
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
 *                   $ref: '#/components/schemas/Research'
 *       401:
 *         description: Yetkisiz erişim
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', researchController.getAll);
router.post('/', requireAuth, validateBasicContent, researchController.create);

/**
 * @swagger
 * /api/researches/{id}:
 *   get:
 *     summary: Araştırma detayı
 *     description: Belirli bir araştırmanın detay bilgilerini getirir
 *     tags: [Research]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Araştırma ID
 *     responses:
 *       200:
 *         description: Araştırma detayı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Research'
 *       404:
 *         description: Araştırma bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Araştırma bilgilerini güncelle
 *     description: Araştırma bilgilerini günceller (Admin)
 *     tags: [Research]
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
 *                 example: "Güncellenmiş Araştırma Başlığı"
 *               content:
 *                 type: string
 *                 example: "Güncellenmiş araştırma içeriği..."
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/updated-research.jpg"
 *     responses:
 *       200:
 *         description: Araştırma başarıyla güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Araştırma bulunamadı
 *   delete:
 *     summary: Araştırmayı sil
 *     description: Araştırma kaydını siler (Admin)
 *     tags: [Research]
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
 *         description: Araştırma başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Araştırma bulunamadı
 */
router.get('/:id', researchController.getById);
router.put('/:id', requireAuth, validateBasicContent, researchController.update);
router.delete('/:id', requireAuth, researchController.delete);

module.exports = router;
