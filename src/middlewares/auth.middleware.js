/**
 * Authentication middleware
 * Checks if admin is logged in
 */
const requireAuth = (req, res, next) => {
    console.log(req.session)
    if (req.session && req.session.adminId) {
        return next();
    }

    res.status(401).json({
        ok: false,
        error: 'Bu işlem için giriş yapmanız gerekiyor',
    });
};

/**
 * Check if user is authenticated (doesn't block, just adds info)
 */
const checkAuth = (req, res, next) => {
    console.log(req.session)
    req.isAuthenticated = !!(req.session && req.session.adminId);
    req.adminId = req.session?.adminId || null;
    next();
};

module.exports = {
    requireAuth,
    checkAuth,
};
