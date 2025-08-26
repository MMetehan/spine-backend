const express = require('express');
const createContentController = require('../controllers/content.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateTeam } = require('../middlewares/validation.middleware');

const router = express.Router();
const teamController = createContentController('Team', 'team');

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Tüm doktorları listele
 *     description: Klinik doktorlarının listesini getirir
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: Doktor listesi
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
 *                     $ref: '#/components/schemas/Team'
 *   post:
 *     summary: Yeni doktor ekle
 *     description: Yeni doktor kaydı oluşturur (Admin)
 *     tags: [Team]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, title]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dr. Ahmet Yılmaz"
 *               title:
 *                 type: string
 *                 example: "Nöroşirurji Uzmanı"
 *               bio:
 *                 type: string
 *                 example: "15 yıllık deneyim"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/doctor.jpg"
 *               order:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Doktor başarıyla oluşturuldu
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
 *                   $ref: '#/components/schemas/Team'
 *       401:
 *         description: Yetkisiz erişim
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', teamController.getAll);
router.post('/', requireAuth, validateTeam, teamController.create);

/**
 * @swagger
 * /api/team/{id}:
 *   get:
 *     summary: Doktor detayı
 *     description: Belirli bir doktorun detay bilgilerini getirir
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doktor ID
 *     responses:
 *       200:
 *         description: Doktor detayı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       404:
 *         description: Doktor bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Doktor bilgilerini güncelle
 *     description: Doktor bilgilerini günceller (Admin)
 *     tags: [Team]
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
 *               title:
 *                 type: string
 *               bio:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Doktor başarıyla güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Doktor bulunamadı
 *   delete:
 *     summary: Doktoru sil
 *     description: Doktor kaydını siler (Admin)
 *     tags: [Team]
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
 *         description: Doktor başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Doktor bulunamadı
 */
router.get('/:id', teamController.getById);
router.put('/:id', requireAuth, validateTeam, teamController.update);
router.delete('/:id', requireAuth, teamController.delete);

module.exports = router;
