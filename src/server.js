require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const { generalRateLimit } = require('./middlewares/rateLimit.middleware');

// Import routes
const authRoutes = require('./routes/auth.routes');
const teamRoutes = require('./routes/team.routes');
const treatmentRoutes = require('./routes/treatments.routes');
const projectRoutes = require('./routes/projects.routes');
const sponsorRoutes = require('./routes/sponsors.routes');
const researchRoutes = require('./routes/researches.routes');
const mediaRoutes = require('./routes/media.routes');
const innovationRoutes = require('./routes/innovations.routes');
const newsRoutes = require('./routes/news.routes');
const faqRoutes = require('./routes/faq.routes');
const contactRoutes = require('./routes/contact.routes');
const appointmentRoutes = require('./routes/appointment.routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Trust proxy for rate limiting (if behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
    // origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    origin: true,
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Logging
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration
app.use(session({
    store: new pgSession({
        conString: process.env.DATABASE_URL,
        tableName: 'session', // Varsayılan tablo adı
        createTableIfMissing: true // Otomatik tablo oluşturma (isteğe bağlı)
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    sameSite: "none",
    cookie: {
        secure: process.env.NODE_ENV === 'production', // HTTPS in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
}));

// General rate limiting
app.use('/api', generalRateLimit);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Anatolian Spine Clinic API',
    swaggerOptions: {
        persistAuthorization: true,
    },
}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        ok: true,
        message: 'Anatolian Spine Clinic API is running',
        timestamp: new Date().toISOString(),
    });
});

// Redirect root to API docs
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// API routes
app.use('/api/admin', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/researches', researchRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/innovations', innovationRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/appointment', appointmentRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        ok: false,
        error: 'Endpoint bulunamadı',
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);

    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV !== 'production';

    res.status(error.status || 500).json({
        ok: false,
        error: isDevelopment ? error.message : 'Sunucu hatası',
        ...(isDevelopment && { stack: error.stack }),
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`� API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`�🔗 API base URL: http://localhost:${PORT}/api`);

    if (process.env.NODE_ENV !== 'production') {
        console.log(`🎯 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    }
});

module.exports = app;
