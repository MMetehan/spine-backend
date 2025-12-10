const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get all education items
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllEducation = async (req, res) => {
  try {
    const education = await prisma.education.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(education);
  } catch (error) {
    console.error("Error fetching education:", error);
    res
      .status(500)
      .json({ message: "Eğitim içerikleri alınırken hata oluştu" });
  }
};

/**
 * Get education by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await prisma.education.findUnique({
      where: { id: parseInt(id) },
    });

    if (!education) {
      return res.status(404).json({ message: "Eğitim içeriği bulunamadı" });
    }

    res.json(education);
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ message: "Eğitim içeriği alınırken hata oluştu" });
  }
};

/**
 * Create new education item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createEducation = async (req, res) => {
  try {
    const { title, summary, imageUrl, link } = req.body;

    const education = await prisma.education.create({
      data: {
        title,
        summary,
        imageUrl,
        link,
      },
    });

    res.status(201).json(education);
  } catch (error) {
    console.error("Error creating education:", error);
    res
      .status(500)
      .json({ message: "Eğitim içeriği oluşturulurken hata oluştu" });
  }
};

/**
 * Update education item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, imageUrl, link } = req.body;

    const education = await prisma.education.update({
      where: { id: parseInt(id) },
      data: {
        title,
        summary,
        imageUrl,
        link,
      },
    });

    res.json(education);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Eğitim içeriği bulunamadı" });
    }
    console.error("Error updating education:", error);
    res
      .status(500)
      .json({ message: "Eğitim içeriği güncellenirken hata oluştu" });
  }
};

/**
 * Delete education item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.education.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Eğitim içeriği başarıyla silindi" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Eğitim içeriği bulunamadı" });
    }
    console.error("Error deleting education:", error);
    res.status(500).json({ message: "Eğitim içeriği silinirken hata oluştu" });
  }
};

module.exports = {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
