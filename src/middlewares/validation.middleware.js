const { body, validationResult } = require("express-validator");

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      error: "Geçersiz veri",
      details: errors.array(),
    });
  }
  next();
};

/**
 * Validation rules for contact form
 */
const validateContact = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("İsim 2-100 karakter arasında olmalıdır"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Geçerli bir e-posta adresi giriniz"),
  body("subject")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Konu 3-200 karakter arasında olmalıdır"),
  body("message")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Mesaj 10-2000 karakter arasında olmalıdır"),
  handleValidationErrors,
];

/**
 * Validation rules for appointment form
 */
const validateAppointment = [
  body("name").trim(),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Geçerli bir e-posta adresi giriniz"),
  body("phone")
    .trim()
    .isMobilePhone("tr-TR")
    .withMessage("Geçerli bir telefon numarası giriniz"),
  body("preferredDate")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Tercih edilen tarih gereklidir"),
  body("message")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Mesaj maksimum 2000 karakter olabilir"),
  handleValidationErrors,
];

/**
 * Validation rules for admin login
 */
const validateLogin = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Kullanıcı adı gereklidir"),
  body("password").isLength({ min: 1 }).withMessage("Şifre gereklidir"),
  handleValidationErrors,
];

/**
 * Validation rules for team members
 */
const validateTeam = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("İsim 2-100 karakter arasında olmalıdır"),
  body("title")
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Ünvan 2-200 karakter arasında olmalıdır"),
  body("bio")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Biyografi minimum 10 karakter olmalıdır"),
  body("imageUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("Geçerli bir URL giriniz"),
  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sıra numarası pozitif bir sayı olmalıdır"),
  handleValidationErrors,
];

/**
 * Validation rules for treatments
 */
const validateTreatment = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Başlık 2-200 karakter arasında olmalıdır"),
  body("slug")
    .trim()
    .isLength({ min: 2, max: 200 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug sadece küçük harf, rakam ve tire içerebilir"),
  body("summary")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Özet maksimum 500 karakter olabilir"),
  body("content")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("İçerik maksimum 10000000 karakter olabilir"),
  body("imageUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("Geçerli bir URL giriniz"),
  handleValidationErrors,
];

/**
 * Validation rules for basic content (projects, sponsors, etc.)
 */
const validateBasicContent = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Başlık 2-200 karakter arasında olmalıdır"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("İsim 2-200 karakter arasında olmalıdır"),
  body("content")
    .optional()
    .trim()
    .withMessage("İçerik minimum 10 karakter olmalıdır"),
  body("description")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Açıklama minimum 10 karakter olmalıdır"),
  body("summary")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Özet minimum 10 karakter olmalıdır"),
  body("imageUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("Geçerli bir URL giriniz"),
  body("logoUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("Geçerli bir URL giriniz"),
  body("logo").optional().trim().isURL().withMessage("Geçerli bir URL giriniz"),
  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Geçerli bir URL giriniz"),
  body("url").optional().trim().isURL().withMessage("Geçerli bir URL giriniz"),
  body("thumbnail")
    .optional()
    .trim()
    .isURL()
    .withMessage("Geçerli bir URL giriniz"),
  body("mediaUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("Geçerli bir URL giriniz"),
  body("link").optional().trim().isURL().withMessage("Geçerli bir URL giriniz"),
  body("type")
    .optional()
    .isIn(["video", "image", "podcast", "webinar", "article", "research"])
    .withMessage("Geçerli bir tür seçiniz"),
  body("category")
    .optional()
    .isIn([
      "education",
      "surgery",
      "research",
      "patient",
      "conference",
      "treatment",
      "recovery",
      "appointment",
      "general",
      "technology",
      "pharmaceutical",
      "equipment",
      "support",
      "ongoing",
      "completed",
      "planned",
      "medical",
      "pharmaceutical",
      "equipment",
      "research",
      "other",
      "healthcare",
    ])
    .withMessage("Geçerli bir kategori seçiniz"),
  body("status")
    .optional()
    .isIn(["published", "draft", "archived", "active", "inactive", "pending"])
    .withMessage("Geçerli bir durum seçiniz"),
  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sıralama pozitif bir sayı olmalıdır"),
  body("publishDate")
    .optional()
    .isISO8601()
    .withMessage("Geçerli bir tarih formatı kullanınız"),
  body("team")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Takım adı maksimum 200 karakter olabilir"),
  body("startDate")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Başlangıç tarihi maksimum 50 karakter olabilir"),
  body("tags")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Etiketler maksimum 500 karakter olabilir")
    .withMessage("Geçerli bir URL giriniz"),
  handleValidationErrors,
];

/**
 * Validation rules for FAQ
 */
const validateFaq = [
  body("question")
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Soru 5-500 karakter arasında olmalıdır"),
  body("answer")
    .trim()
    .isLength({ min: 5, max: 2000 })
    .withMessage("Cevap 5-2000 karakter arasında olmalıdır"),
  handleValidationErrors,
];

module.exports = {
  validateContact,
  validateAppointment,
  validateLogin,
  validateTeam,
  validateTreatment,
  validateBasicContent,
  validateFaq,
  handleValidationErrors,
};
