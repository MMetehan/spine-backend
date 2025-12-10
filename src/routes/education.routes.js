const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { checkAuth } = require("../middlewares/auth.middleware");
const {
  handleValidationErrors,
} = require("../middlewares/validation.middleware");
const {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/education.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the education item
 *         title:
 *           type: string
 *           description: Education title
 *         summary:
 *           type: string
 *           description: Brief summary of the education content
 *         imageUrl:
 *           type: string
 *           description: URL for education image
 *         link:
 *           type: string
 *           description: External link for education resource
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *       example:
 *         id: 1
 *         title: "Spinal Health Education Program"
 *         summary: "Comprehensive spine health education for patients"
 *         imageUrl: "https://example.com/education.jpg"
 *         link: "https://education.anatolianspine.com"
 *         createdAt: "2024-01-15T10:30:00Z"
 */

/**
 * @swagger
 * /api/education:
 *   get:
 *     summary: Get all education items
 *     tags: [Education]
 *     responses:
 *       200:
 *         description: List of education items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Education'
 *       500:
 *         description: Server error
 */
router.get("/", getAllEducation);

/**
 * @swagger
 * /api/education/{id}:
 *   get:
 *     summary: Get education by ID
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Education ID
 *     responses:
 *       200:
 *         description: Education item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *       404:
 *         description: Education not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("Geçerli bir ID girin"),
  handleValidationErrors,
  getEducationById
);

/**
 * @swagger
 * /api/education:
 *   post:
 *     summary: Create new education item (Admin only)
 *     tags: [Education]
 *     security:
 *       - sessionAuth: []
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
 *                 description: Education title
 *               summary:
 *                 type: string
 *                 description: Brief summary
 *               imageUrl:
 *                 type: string
 *                 description: Image URL
 *               link:
 *                 type: string
 *                 description: External link
 *             example:
 *               title: "Spine Surgery Techniques"
 *               summary: "Modern minimally invasive spine surgery methods"
 *               imageUrl: "https://example.com/surgery.jpg"
 *               link: "https://education.anatolianspine.com/surgery"
 *     responses:
 *       201:
 *         description: Education created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  checkAuth,
  [
    body("title").notEmpty().trim().withMessage("Başlık gereklidir"),
    body("summary").optional().trim(),
    body("imageUrl")
      .optional()
      .isURL()
      .withMessage("Geçerli bir resim URL'si girin"),
    body("link").optional().isURL().withMessage("Geçerli bir link girin"),
  ],
  handleValidationErrors,
  createEducation
);

/**
 * @swagger
 * /api/education/{id}:
 *   put:
 *     summary: Update education item (Admin only)
 *     tags: [Education]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Education ID
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
 *               summary:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Education updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Education not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  checkAuth,
  [
    param("id").isInt({ min: 1 }).withMessage("Geçerli bir ID girin"),
    body("title").notEmpty().trim().withMessage("Başlık gereklidir"),
    body("summary").optional().trim(),
    body("imageUrl")
      .optional()
      .isURL()
      .withMessage("Geçerli bir resim URL'si girin"),
    body("link").optional().isURL().withMessage("Geçerli bir link girin"),
  ],
  handleValidationErrors,
  updateEducation
);

/**
 * @swagger
 * /api/education/{id}:
 *   delete:
 *     summary: Delete education item (Admin only)
 *     tags: [Education]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Education ID
 *     responses:
 *       200:
 *         description: Education deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Education not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  checkAuth,
  param("id").isInt({ min: 1 }).withMessage("Geçerli bir ID girin"),
  handleValidationErrors,
  deleteEducation
);

module.exports = router;
