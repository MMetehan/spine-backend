const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Railway volume path
const UPLOAD_PATH = process.env.UPLOAD_PATH || '/uploads';

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
  console.log(`📁 Upload directory created: ${UPLOAD_PATH}`);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp and random hash
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const filename = `${timestamp}-${uniqueId}${ext}`;
    cb(null, filename);
  }
});

// File filter - Accept all file types
const fileFilter = (req, file, cb) => {
  // Accept all files
  cb(null, true);
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  }
});

/**
 * Upload single file
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
const uploadSingleFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Dosya yüklenmedi'
      });
    }

    // Generate file URL
    const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:4000'}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Dosya başarıyla yüklendi',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Dosya yüklenirken hata oluştu',
      error: error.message
    });
  }
};

/**
 * Upload multiple files
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
const uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Dosya yüklenmedi'
      });
    }

    const baseUrl = process.env.BACKEND_URL || 'http://localhost:4000';
    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `${baseUrl}/uploads/${file.filename}`,
      path: `/uploads/${file.filename}`
    }));

    res.status(200).json({
      success: true,
      message: `${files.length} dosya başarıyla yüklendi`,
      files: files
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Dosyalar yüklenirken hata oluştu',
      error: error.message
    });
  }
};

/**
 * Delete uploaded file
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(UPLOAD_PATH, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Dosya bulunamadı'
      });
    }

    // Delete file
    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      message: 'Dosya başarıyla silindi'
    });
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Dosya silinirken hata oluştu',
      error: error.message
    });
  }
};

/**
 * Get list of uploaded files
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
const getFilesList = async (req, res) => {
  try {
    const files = fs.readdirSync(UPLOAD_PATH);
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:4000';

    const fileList = files.map(filename => {
      const filePath = path.join(UPLOAD_PATH, filename);
      const stats = fs.statSync(filePath);
      return {
        filename: filename,
        size: stats.size,
        createdAt: stats.birthtime,
        url: `${baseUrl}/uploads/${filename}`,
        path: `/uploads/${filename}`
      };
    });

    res.status(200).json({
      success: true,
      count: fileList.length,
      files: fileList
    });
  } catch (error) {
    console.error('❌ List files error:', error);
    res.status(500).json({
      success: false,
      message: 'Dosya listesi alınırken hata oluştu',
      error: error.message
    });
  }
};

module.exports = {
  upload,
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile,
  getFilesList,
  UPLOAD_PATH
};