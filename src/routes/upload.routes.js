const express = require('express');
const router = express.Router();
const {
  upload,
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile,
  getFilesList
} = require('../controllers/upload.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     FileUploadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Upload success status
 *         message:
 *           type: string
 *           description: Response message
 *         file:
 *           type: object
 *           properties:
 *             filename:
 *               type: string
 *               description: Generated unique filename
 *             originalName:
 *               type: string
 *               description: Original filename
 *             size:
 *               type: integer
 *               description: File size in bytes
 *             mimetype:
 *               type: string
 *               description: File MIME type
 *             url:
 *               type: string
 *               description: Full URL to access the file
 *             path:
 *               type: string
 *               description: Relative path to the file
 *       example:
 *         success: true
 *         message: "Dosya başarıyla yüklendi"
 *         file:
 *           filename: "1702345678900-a1b2c3d4e5f6.jpg"
 *           originalName: "image.jpg"
 *           size: 245678
 *           mimetype: "image/jpeg"
 *           url: "https://anatolian-spine-backend-production.up.railway.app/uploads/1702345678900-a1b2c3d4e5f6.jpg"
 *           path: "/uploads/1702345678900-a1b2c3d4e5f6.jpg"
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload single file
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload (max 10MB)
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileUploadResponse'
 *       400:
 *         description: No file provided
 *       413:
 *         description: File too large (max 10MB)
 *       500:
 *         description: Server error
 */
router.post('/', upload.single('file'), uploadSingleFile);

/**
 * @swagger
 * /api/upload/multiple:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Files to upload (max 10MB each)
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: No files provided
 *       500:
 *         description: Server error
 */
router.post('/multiple', upload.array('files', 10), uploadMultipleFiles);

/**
 * @swagger
 * /api/upload/list:
 *   get:
 *     summary: Get list of all uploaded files
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: List of uploaded files
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 */
router.get('/list', getFilesList);

/**
 * @swagger
 * /api/upload/{filename}:
 *   delete:
 *     summary: Delete uploaded file
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Filename to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.delete('/:filename', deleteFile);

module.exports = router;