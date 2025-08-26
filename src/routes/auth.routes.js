const express = require('express');
const { login, logout, checkSession } = require('../controllers/auth.controller');
const { validateLogin } = require('../middlewares/validation.middleware');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin girişi
 *     description: Admin kullanıcısı için oturum açma
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginForm'
 *     responses:
 *       200:
 *         description: Giriş başarılı
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
 *                   example: "Giriş başarılı"
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *       401:
 *         description: Geçersiz kullanıcı adı veya şifre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', validateLogin, login);

/**
 * @swagger
 * /api/admin/logout:
 *   post:
 *     summary: Admin çıkışı
 *     description: Admin oturumunu sonlandırma
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Çıkış başarılı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 */
router.post('/logout', logout);

/**
 * @swagger
 * /api/admin/session:
 *   get:
 *     summary: Oturum kontrolü
 *     description: Aktif admin oturumunu kontrol etme
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Aktif oturum bilgisi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *       401:
 *         description: Oturum bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/session', requireAuth, checkSession);

module.exports = router;
