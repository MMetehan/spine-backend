const express = require('express');
const { submitContact } = require('../controllers/contact.controller');
const { formRateLimit } = require('../middlewares/rateLimit.middleware');
const { validateContact } = require('../middlewares/validation.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: İletişim formu gönder
 *     description: İletişim formunu e-posta olarak gönderir
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactForm'
 *     responses:
 *       200:
 *         description: Mesaj başarıyla gönderildi
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
 *                   example: "Mesajınız gönderildi. En kısa sürede size döneceğiz."
 *       400:
 *         description: Geçersiz veri
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       429:
 *         description: Çok fazla istek
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Çok fazla istek gönderdiniz. Lütfen birkaç dakika bekleyip tekrar deneyin."
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', formRateLimit, validateContact, submitContact);

module.exports = router;
