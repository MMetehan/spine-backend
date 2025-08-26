const express = require('express');
const createContentController = require('../controllers/content.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBasicContent } = require('../middlewares/validation.middleware');

const router = express.Router();
const projectController = createContentController('Project', 'project');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Tüm projeleri listele
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Proje listesi
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
 *                     $ref: '#/components/schemas/Project'
 *   post:
 *     summary: Yeni proje ekle (Admin)
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Proje başlığı
 *                 example: "Omurga Cerrahisi Araştırma Projesi"
 *               summary:
 *                 type: string
 *                 description: Proje özeti
 *                 example: "Minimal invazif cerrahi teknikleri geliştirme projesi"
 *               imageUrl:
 *                 type: string
 *                 description: Proje görseli URL'si
 *                 example: "https://example.com/project-image.jpg"
 *               link:
 *                 type: string
 *                 description: Proje detay linki
 *                 example: "https://example.com/project-details"
 *     responses:
 *       201:
 *         description: Proje başarıyla oluşturuldu
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
 *                   example: "Proje başarıyla oluşturuldu"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Geçersiz veri
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Yetkisiz erişim
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', projectController.getAll);
router.post('/', requireAuth, validateBasicContent, projectController.create);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Proje detayı
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proje detayı
 *       404:
 *         description: Proje bulunamadı
 *   put:
 *     summary: Proje güncelle (Admin)
 *     tags: [Projects]
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
 *                 description: Proje başlığı
 *                 example: "Güncellenmiş Proje Başlığı"
 *               summary:
 *                 type: string
 *                 description: Proje özeti
 *                 example: "Güncellenmiş proje özeti"
 *               imageUrl:
 *                 type: string
 *                 description: Proje görseli URL'si
 *                 example: "https://example.com/updated-project.jpg"
 *               link:
 *                 type: string
 *                 description: Proje detay linki
 *                 example: "https://example.com/updated-project-details"
 *     responses:
 *       200:
 *         description: Proje başarıyla güncellendi
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
 *                   example: "Proje başarıyla güncellendi"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Geçersiz veri
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Proje bulunamadı
 *   delete:
 *     summary: Proje sil (Admin)
 *     tags: [Projects]
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
 *         description: Proje başarıyla silindi
 *       401:
 *         description: Yetkisiz erişim
 */
router.get('/:id', projectController.getById);
router.put('/:id', requireAuth, validateBasicContent, projectController.update);
router.delete('/:id', requireAuth, projectController.delete);

module.exports = router;
