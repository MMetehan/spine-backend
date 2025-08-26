const express = require('express');
const createContentController = require('../controllers/content.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateFaq } = require('../middlewares/validation.middleware');

const router = express.Router();
const faqController = createContentController('Faq', 'faq');

/**
 * @swagger
 * /api/faq:
 *   get:
 *     summary: Sık sorulan soruları listele
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: FAQ listesi
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
 *                     $ref: '#/components/schemas/Faq'
 *   post:
 *     summary: Yeni FAQ ekle (Admin)
 *     tags: [FAQ]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [question, answer]
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Omurga cerrahisi ne kadar sürer?"
 *               answer:
 *                 type: string
 *                 example: "Omurga cerrahisinin süresi, ameliyatın türüne ve karmaşıklığına bağlı olarak 2-6 saat arasında değişebilir."
 *               category:
 *                 type: string
 *                 enum: [treatment, surgery, recovery, appointment, general]
 *                 example: "surgery"
 *               order:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: [published, draft, archived]
 *                 example: "published"
 *     responses:
 *       201:
 *         description: FAQ başarıyla oluşturuldu
 *       401:
 *         description: Yetkisiz erişim
 */
router.get('/', faqController.getAll);
router.post('/', requireAuth, validateFaq, faqController.create);

/**
 * @swagger
 * /api/faq/{id}:
 *   get:
 *     summary: FAQ detayı
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: FAQ detayı
 *       404:
 *         description: FAQ bulunamadı
 *   put:
 *     summary: FAQ güncelle (Admin)
 *     tags: [FAQ]
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
 *               question:
 *                 type: string
 *                 example: "Omurga cerrahisi ne kadar sürer?"
 *               answer:
 *                 type: string
 *                 example: "Omurga cerrahisinin süresi, ameliyatın türüne ve karmaşıklığına bağlı olarak 2-6 saat arasında değişebilir."
 *               category:
 *                 type: string
 *                 enum: [treatment, surgery, recovery, appointment, general]
 *                 example: "surgery"
 *               order:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: [published, draft, archived]
 *                 example: "published"
 *     responses:
 *       200:
 *         description: FAQ başarıyla güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *   delete:
 *     summary: FAQ sil (Admin)
 *     tags: [FAQ]
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
 *         description: FAQ başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 */
router.get('/:id', faqController.getById);
router.put('/:id', requireAuth, validateFaq, faqController.update);
router.delete('/:id', requireAuth, faqController.delete);

module.exports = router;
