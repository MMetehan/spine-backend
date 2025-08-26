const prisma = require('../utils/prisma');

/**
 * Generic content controller factory
 * Creates CRUD operations for any Prisma model
 */
const createContentController = (modelName, modelKey = modelName.toLowerCase()) => {
    return {
        // GET all items
        getAll: async (req, res) => {
            try {
                const items = await prisma[modelKey].findMany({
                    orderBy: modelKey === 'team' ? { order: 'asc' } : { createdAt: 'desc' },
                });

                res.json({
                    ok: true,
                    data: items,
                });
            } catch (error) {
                console.error(`Get all ${modelName} error:`, error);
                res.status(500).json({
                    ok: false,
                    error: `${modelName} listesi alınırken bir hata oluştu`,
                });
            }
        },

        // GET single item by ID
        getById: async (req, res) => {
            try {
                const { id } = req.params;
                const item = await prisma[modelKey].findUnique({
                    where: { id: parseInt(id) },
                });

                if (!item) {
                    return res.status(404).json({
                        ok: false,
                        error: `${modelName} bulunamadı`,
                    });
                }

                res.json({
                    ok: true,
                    data: item,
                });
            } catch (error) {
                console.error(`Get ${modelName} by ID error:`, error);
                res.status(500).json({
                    ok: false,
                    error: `${modelName} alınırken bir hata oluştu`,
                });
            }
        },

        // GET single item by slug (for treatments)
        getBySlug: async (req, res) => {
            try {
                const { slug } = req.params;
                const item = await prisma[modelKey].findUnique({
                    where: { slug },
                });

                if (!item) {
                    return res.status(404).json({
                        ok: false,
                        error: `${modelName} bulunamadı`,
                    });
                }

                res.json({
                    ok: true,
                    data: item,
                });
            } catch (error) {
                console.error(`Get ${modelName} by slug error:`, error);
                res.status(500).json({
                    ok: false,
                    error: `${modelName} alınırken bir hata oluştu`,
                });
            }
        },

        // POST create new item (admin only)
        create: async (req, res) => {
            try {
                const data = req.body;

                // Convert string numbers to integers where needed
                if (data.order) data.order = parseInt(data.order);

                const item = await prisma[modelKey].create({
                    data,
                });

                res.status(201).json({
                    ok: true,
                    message: `${modelName} başarıyla oluşturuldu`,
                    data: item,
                });
            } catch (error) {
                console.error(`Create ${modelName} error:`, error);

                // Handle unique constraint errors
                if (error.code === 'P2002') {
                    return res.status(400).json({
                        ok: false,
                        error: 'Bu değer zaten kullanımda',
                    });
                }

                res.status(500).json({
                    ok: false,
                    error: `${modelName} oluşturulurken bir hata oluştu`,
                });
            }
        },

        // PUT update item (admin only)
        update: async (req, res) => {
            try {
                const { id } = req.params;
                const data = req.body;

                // Convert string numbers to integers where needed
                if (data.order) data.order = parseInt(data.order);

                const item = await prisma[modelKey].update({
                    where: { id: parseInt(id) },
                    data,
                });

                res.json({
                    ok: true,
                    message: `${modelName} başarıyla güncellendi`,
                    data: item,
                });
            } catch (error) {
                console.error(`Update ${modelName} error:`, error);

                // Handle record not found
                if (error.code === 'P2025') {
                    return res.status(404).json({
                        ok: false,
                        error: `${modelName} bulunamadı`,
                    });
                }

                // Handle unique constraint errors
                if (error.code === 'P2002') {
                    return res.status(400).json({
                        ok: false,
                        error: 'Bu değer zaten kullanımda',
                    });
                }

                res.status(500).json({
                    ok: false,
                    error: `${modelName} güncellenirken bir hata oluştu`,
                });
            }
        },

        // DELETE item (admin only)
        delete: async (req, res) => {
            try {
                const { id } = req.params;

                await prisma[modelKey].delete({
                    where: { id: parseInt(id) },
                });

                res.json({
                    ok: true,
                    message: `${modelName} başarıyla silindi`,
                });
            } catch (error) {
                console.error(`Delete ${modelName} error:`, error);

                // Handle record not found
                if (error.code === 'P2025') {
                    return res.status(404).json({
                        ok: false,
                        error: `${modelName} bulunamadı`,
                    });
                }

                res.status(500).json({
                    ok: false,
                    error: `${modelName} silinirken bir hata oluştu`,
                });
            }
        },
    };
};

module.exports = createContentController;
