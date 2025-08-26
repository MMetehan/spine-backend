const rateLimit = require('express-rate-limit');

/**
 * Rate limiting for contact and appointment forms
 */
const formRateLimit = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 180000, // 3 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 999999, // limit each IP to 999999 requests per windowMs
    message: {
        ok: false,
        error: 'Çok fazla istek gönderdiniz. Lütfen birkaç dakika bekleyip tekrar deneyin.',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // Skip successful requests
    skipSuccessfulRequests: true,
    // Custom key generator to rate limit by IP
    keyGenerator: (req) => {
        return req.ip || req.connection.remoteAddress;
    },
});

/**
 * General API rate limiting
 */
const generalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 999999, // limit each IP to 999999 requests per windowMs
    message: {
        ok: false,
        error: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    formRateLimit,
    generalRateLimit,
};
