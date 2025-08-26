const express = require('express');
const { submitAppointment } = require('../controllers/contact.controller');
const { formRateLimit } = require('../middlewares/rateLimit.middleware');
const { validateAppointment } = require('../middlewares/validation.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/appointment:
 *   post:
 *     summary: Randevu talebi gönder
 *     description: Randevu talebini e-posta olarak gönderir
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentForm'
 *     responses:
 *       200:
 *         description: Randevu talebi başarıyla gönderildi
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
 *                   example: "Randevu talebiniz alındı. En kısa sürede size geri dönüş yapılacaktır."
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
router.post('/', formRateLimit, validateAppointment, submitAppointment);

module.exports = router;
