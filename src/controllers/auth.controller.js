const bcrypt = require('bcrypt');
const prisma = require('../utils/prisma');

/**
 * Admin login controller
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin user
        const admin = await prisma.admin.findUnique({
            where: { username },
        });

        if (!admin) {
            return res.status(401).json({
                ok: false,
                error: 'Geçersiz kullanıcı adı veya şifre',
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                ok: false,
                error: 'Geçersiz kullanıcı adı veya şifre',
            });
        }

        // Set session
        req.session.adminId = admin.id;
        req.session.username = admin.username;

        res.json({
            ok: true,
            message: 'Giriş başarılı',
            admin: {
                id: admin.id,
                username: admin.username,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            ok: false,
            error: 'Giriş işlemi sırasında bir hata oluştu',
        });
    }
};

/**
 * Admin logout controller
 */
const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).json({
                    ok: false,
                    error: 'Çıkış işlemi sırasında bir hata oluştu',
                });
            }

            res.json({
                ok: true,
                message: 'Başarıyla çıkış yapıldı',
            });
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            ok: false,
            error: 'Çıkış işlemi sırasında bir hata oluştu',
        });
    }
};

/**
 * Check admin session
 */
const checkSession = async (req, res) => {
    try {
        if (req.session.adminId) {
            const admin = await prisma.admin.findUnique({
                where: { id: req.session.adminId },
                select: { id: true, username: true },
            });

            if (admin) {
                return res.json({
                    ok: true,
                    admin,
                });
            }
        }

        res.status(401).json({
            ok: false,
            error: 'Oturum bulunamadı',
        });
    } catch (error) {
        console.error('Session check error:', error);
        res.status(500).json({
            ok: false,
            error: 'Oturum kontrolü sırasında bir hata oluştu',
        });
    }
};

module.exports = {
    login,
    logout,
    checkSession,
};
